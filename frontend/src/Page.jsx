import React from 'react';
import Header from './components/Header.jsx';
import Popup from './components/Popup.jsx';
import UserInfo from './components/UserInfo.jsx'
import UsersList from './components/UsersList.jsx'
import MainPage from './components/MainPage.jsx'

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            popup: ""
        };
        this.content = this.content.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onPopupSubmit = this.onPopupSubmit.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
    }
    onButtonClick(data){
        if(data.request === "findUser" || data.request === "newUser" || data.request === "deleteUser")
            this.setState({
                popup: <Popup type={data.request} onSubmit={this.onPopupSubmit} hide={this.hidePopup}/>
            });
        else if(data.request === "allUsers")
            this.setState({userId: -1});
        else if(data.request === "editUser")
            this.setState({
                popup: <Popup type={data.request} onSubmit={this.onPopupSubmit} userData={data.userData} hide={this.hidePopup}/>
            });
        else if(data.request === "mainPage"){
            this.setState({userId: 0});
        }
        
    }
    onPopupSubmit(data){
        if(data.type === "findUser"){
            if(data.refs.id.value < 1){
                data.onError("Bad id value.");
                return;
            }
            this.setState({userId: data.refs.id.value});
            this.hidePopup();
        }else if(data.type === "newUser"){
            let fields = data.refs;
            let registerData={
                id: parseInt(fields.id.value),
                name: fields.name.value,
                primaryGroup: fields.group.value,
                joined: new Date().toISOString(),
                lastVisit: new Date().toISOString(),
                posts: fields.posts.value,
                photoUrl: fields.avatar.value
            };
            if(fields.cover.value !== null && fields.cover.value > 1) 
                registerData.coverPhotoUrl = fields.cover.value;
            this.newUser(registerData)
            .then((data) =>{
                this.setState({userId: parseInt(registerData.id)});
                this.hidePopup();
            });
        }else if(data.type === "deleteUser"){
            this.deleteUser(this.state.userId)
            .then((data) =>{
                this.setState({userId: 0});
                this.hidePopup();
            });
        }else if(data.type === "editUser"){
            let fields = data.refs;
            let updateData={
                id: parseInt(this.state.userId),
                name: fields.name.value,
                primaryGroup: fields.group.value,
                joined: new Date().toISOString(),
                lastVisit: new Date().toISOString(),
                posts: fields.posts.value,
                photoUrl: fields.avatar.value
            };
            if(fields.cover.value !== null && fields.cover.value > 1) 
                updateData.coverPhotoUrl = fields.cover.value;
            this.updateUser(updateData)
            .then((data) =>{
                this.setState({userId: 0});
                this.hidePopup();
            });
        }
    }
    updateUser(data){
        let userId=data.id;
        delete data.id;
        return fetch('/api/user/'+userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        });
    }
    deleteUser(userID){
        return fetch('/api/user/'+userID, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            return response.json();
        });
    }
    newUser(data){
        return fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        });
    }
    hidePopup(){
        this.setState({popup: ""});
    }
    content(){
        if(this.state.userId>0)
            return <UserInfo userId={this.state.userId} onButtonClick={this.onButtonClick}/>;
        else if(this.state.userId === -1){
            return <UsersList />
        }
        else{
            return <MainPage />;
        }
    }
    render() {
        return (
            <div>
                {this.state.popup}
                <Header onNavigationClick={this.onButtonClick}/>
                {this.content()}
            </div>
        );
    }
}

import React from 'react';
import Header from './components/Header.jsx';
import Popup from './components/Popup.jsx';
import UserInfo from './components/UserInfo.jsx'
import UsersList from './components/UsersList.jsx'
import { userInfo } from 'os';

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
        if(data === "findUser")
            this.setState({
                popup: <Popup type={data} onSubmit={this.onPopupSubmit} hide={this.hidePopup}/>
            });
        else if(data === "allUsers")
            this.setState({userId: -1});
    }
    onPopupSubmit(data){
        if(data.type == "findUser"){
            if(data.refs.id.value < 1){
                data.onError("Bad id value.");
                return;
            }
            this.setState({userId: data.refs.id.value});
            this.hidePopup();
        }
    }
    hidePopup(){
        this.setState({popup: ""});
    }
    content(){
        if(this.state.userId>0)
            return <UserInfo userId={this.state.userId}/>;
        else if(this.state.userId === -1){
            return <UsersList />
        }
        else{
            return <div>Choose action in navigation</div>;
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

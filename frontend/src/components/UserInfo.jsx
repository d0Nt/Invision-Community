import React from 'react';
import './../css/UserInfo.css';

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            id: "",
            name: "",
            primaryGroup: "",
            joined: "",
            lastVisit: "",
            posts: "",
            photoUrl: "",
            coverPhotoUrl: ""
        };
        this.updateInfo(this.props.userId);
    }
    updateInfo(id){
        fetch("/api/user/"+id)
        .then((results) => { 
            if(!results.ok)
                return {error: "error"};
            return results.json()
        })
        .then((data) => {
            if(typeof data.error === 'undefined'){
                this.setState({coverPhotoUrl: ''});
                this.setState(data);
            }else
                console.log(data.error);
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userId !== this.props.userId)
            this.updateInfo(nextProps.userId);
    }
    render() {
        return (
            <div className="cover content">
                <img src={this.state.coverPhotoUrl == ''?
                "https://forumas.rls.lt/uploads/monthly_2017_05/profile_bg.jpg.2b7c322b65b89a3275deb0ba490a3ba6.jpg":
                this.state.coverPhotoUrl} />
                <div className="info-bar">
                    <div className="item">Post Count: {this.state.posts}</div>
                    <div className="item">Joined date: {this.state.joined}</div>
                    <div className="item">Last visit: {this.state.lastVisit}</div>
                </div>
                <div className="user">
                    <div className="name">{this.state.name}</div>
                    <div className="group">Grupė</div>
                </div>
                <img className="avatar" src={this.state.photoUrl} />
                <div className="buttons edit">
                    <div className="button" onClick={() => this.props.onButtonClick({request:"editUser", userData:this.state})}>Edit user</div>
                    <div className="button" onClick={() => this.props.onButtonClick({request:"deleteUser"})}>Delete user</div>
                </div>
            </div>
        );
    }
}
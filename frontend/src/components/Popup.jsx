import React from 'react';
import './../css/Popup.css';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
        this.onPopupHide = this.onPopupHide.bind(this);
        this.onPopupSubmit = this.onPopupSubmit.bind(this);
        this.onValidated = this.onValidated.bind(this);
    }
    onPopupHide(event){
        if(typeof this.props.hide !== 'undefined')
            this.props.hide(this.props.type);
    }
    onPopupSubmit(){
        if(typeof this.props.onSubmit !== 'undefined')
            this.props.onSubmit({onError: this.onValidated, type: this.props.type, refs: this.refs});
    }
    onValidated(error){
        this.setState({error_text:error});
    }
    renderFields(){
        if(this.props.type === "newUser")
            return (
                <div>
                    <div>Enter user info to create entity</div><br />
                    <label>ID:</label>
                    <input type="number" placeholder="User id" ref="id"/>
                    <label>Name:</label>
                    <input type="text" placeholder="User name" ref="name"/>
                    <label>Group:</label>
                    <input type="number" placeholder="Group number" ref="group"/>
                    <label>Posts:</label>
                    <input type="number" placeholder="Posts count" ref="posts"/>
                    <label>Avatar link:</label>
                    <input type="text" placeholder="avatar image url" ref="avatar"/>
                    <label>Cover photo:</label>
                    <input type="text" placeholder="cover image url" ref="cover"/>
                    <br />
                    <input type="submit" onClick={this.onPopupSubmit} value="Create"/>
                </div>
            );
        if(this.props.type === "findUser")
            return (
                <div>
                    <div>Enter user id to see more info about him</div><br />
                    <input type="number" placeholder="Id to find" ref="id"/>
                    <br /><br />
                    <input type="submit" onClick={this.onPopupSubmit} value="Find"/>
                </div>
            );
        if(this.props.type === "deleteUser")
            return (
                <div>
                    <div>Are you sure you want to delete this user?</div><br /><br />
                    <input type="submit" onClick={this.onPopupHide} value="No"/>
                    <input type="submit" onClick={this.onPopupSubmit} value="Yes"/>
                </div>
            );
        if(this.props.type === "editUser"){
            return (
                <div>
                    <div>Update user info</div><br />
                    <label>Name:</label>
                    <input type="text" placeholder="User name" defaultValue={this.props.userData.name} ref="name"/>
                    <label>Group:</label>
                    <input type="number" placeholder="Group number" defaultValue={this.props.userData.primaryGroup} ref="group"/>
                    <label>Posts:</label>
                    <input type="number" placeholder="Posts count" defaultValue={this.props.userData.posts} ref="posts"/>
                    <label>Avatar link:</label>
                    <input type="text" placeholder="avatar image url" defaultValue={this.props.userData.photoUrl} ref="avatar"/>
                    <label>Cover photo:</label>
                    <input type="text" placeholder="cover image url" defaultValue={this.props.userData.coverPhotoUrl} ref="cover"/>
                    <br /><br />
                    <input type="submit" onClick={this.onPopupSubmit} value="Update"/>
                </div>
                );
            }
    }
    render() {
        return (
            <div>
                <div className="popup">
                    <div className="error">{this.state.error_text}</div>
                    {this.renderFields()}
                </div>
                <div className="popup-background" onClick={this.onPopupHide}>
                </div>
            </div>
        );
    }
}
import React from 'react';
import './../css/Header.css';
import Popup from './Popup.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div className="logo" onClick={() => this.props.onNavigationClick({request:"mainPage"})}>
                    <span className="logo white">Invision</span>Users
                </div>
                <div className="navigation">
                    <div className="item" onClick={() => this.props.onNavigationClick({request:"newUser"})}>Create new user</div>
                    <div className="item" onClick={() => this.props.onNavigationClick({request:"findUser"})}>Find user</div>
                    <div className="item" onClick={() => this.props.onNavigationClick({request:"allUsers"})}>All users</div>
                </div>
            </div>
        );
    }
}
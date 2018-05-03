import React from 'react';
import './../css/Header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <span className="logo white">Invision</span>Users
                </div>
                <div className="navigation">
                    <div className="item">Find user</div>
                    <div className="item">All users</div>
                </div>
            </div>
        );
    }
}
import React from 'react';
import UserInfo from './UserInfo.jsx';
import './../css/Content.css';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content">
                <UserInfo userId='1' />
            </div>
        );
    }
}
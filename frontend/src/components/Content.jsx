import React from 'react';
import './../css/Content.css';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content">
                <div className="cover">
                    <img src="https://forumas.rls.lt/uploads/monthly_2017_05/profile_bg.jpg.2b7c322b65b89a3275deb0ba490a3ba6.jpg" />
                    <div className="info-bar">
                        <div className="item">Post Count</div>
                        <div className="item">Joined date</div>
                        <div className="item">Last visit</div>
                    </div>
                    <div className="user">
                        <div className="name">Vardas</div>
                        <div className="group">Grupė</div>
                    </div>
                    <img className="avatar" src="https://forumas.rls.lt/uploads/monthly_2017_07/wtf-i-just-read.gif.8f70b36780b43dc9e375659d4e4e3994.gif" />

                </div>
            </div>
        );
    }
}
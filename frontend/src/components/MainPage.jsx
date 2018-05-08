import React from 'react';
import './../css/MainPage.css';
export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content">
                <div className="panel">
                    <div className="head">
                        Introduction
                    </div>
                    <div className="content">
                        Some content
                    </div>
                </div>
            </div>
        );
    }
}
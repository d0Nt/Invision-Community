import React from 'react';
import './../css/Popup.css';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="popup-background">
                <div className="popup">
                    test data
                </div>
            </div>
        );
    }
}
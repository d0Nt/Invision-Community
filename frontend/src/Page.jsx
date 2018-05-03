import React from 'react';
import Header from './components/Header.jsx';
import Content from './components/Content.jsx';
import Popup from './components/Popup.jsx';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        );
    }
}

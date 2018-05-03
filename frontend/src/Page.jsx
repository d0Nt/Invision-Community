import React from 'react';
import Header from './components/Header.jsx';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
            </div>
        );
    }
}

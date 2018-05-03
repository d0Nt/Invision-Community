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
        if(this.props.type === "findUser")
            return (
                <input type="number" placeholder="Id to find" ref="id"/>
            );
            
    }
    render() {
        return (
            <div>
                <div className="popup">
                    <div className="error">{this.state.error_text}</div>
                    {this.renderFields()}
                    <input type="submit" onClick={this.onPopupSubmit} />
                </div>
                <div className="popup-background" onClick={this.onPopupHide}>
                </div>
            </div>
        );
    }
}
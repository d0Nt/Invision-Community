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
                <div>
                    <div>Enter user id to see more info about him</div><br />
                    <input type="number" placeholder="Id to find" ref="id"/>
                </div>
            );
            
    }
    render() {
        return (
            <div>
                <div className="popup">
                    <div className="error">{this.state.error_text}</div>
                    {this.renderFields()}
                    <br />
                    <input type="submit" onClick={this.onPopupSubmit} />
                </div>
                <div className="popup-background" onClick={this.onPopupHide}>
                </div>
            </div>
        );
    }
}
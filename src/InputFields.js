import React from 'react';

/* CheckBox

This component is a checbox with some accompanying text.

*/
class CheckBox extends React.Component{
    render(){
        return(
            <label>
                { this.props.text }
                <input type="checkbox" checked={ this.props.checked } onChange={ this.props.callback }></input>
            </label>
        );
    }
}

/* DateField

This component is a basic wrapper for a "date" input

*/
class DateField extends React.Component{
    constructor(props){
        super(props);

        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        this.min_string = `${ year }-${ month }-${ day }`;
    }

    render(){
        return(
            <label>
                { this.props.text }
                <input type="date" class="form-control" min={ this.min_string } value={ this.props.value } onChange={ this.props.callback }></input>
            </label>
        );
    }

}

/* TimeField

Contains fields for hours, minutes, and AM/PM

*/
class TimeField extends React.Component{
    render(){
        return(
            <label>
                { this.props.text }
                <input type="time" class="form-control" value={ this.props.value } onChange={ this.props.callback } required></input>
            </label>
        )
    }
}

export {CheckBox, DateField, TimeField};
import React from 'react';
import { SelectField } from "./TextFields.js";

/* CheckBox

This component is a checbox with some accompanying text.

*/
class IntervalField extends React.Component{
    render(){
        return(
            <label>
                { this.props.text }
                <input type="checkbox" checked={ this.props.checked } onChange={ this.props.checkbox_callback }></input>
                <SelectField id="interval-select" disabled={ !this.props.checked } elements={ this.props.elements }
                    onChange={ this.props.interval_callback }></SelectField>
                <input type="number" class="text-basic" min="0" max={ this.props.max } disabled={ !this.props.checked } 
                    placeholder={ this.props.repeat_default } onChange={ this.props.repeats_callback } value={ this.props.repeats }></input>
            </label>
        )
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
                <input type="date" class="text-basic" min={ this.min_string } value={ this.props.value } onChange={ this.props.callback }></input>
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
                <input type="time" class="text-basic" value={ this.props.value } onChange={ this.props.callback } required></input>
            </label>
        )
    }
}

export { IntervalField, DateField, TimeField };
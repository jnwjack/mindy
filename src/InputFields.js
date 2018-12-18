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
                <input type="date" min={ this.min_string }></input>
            </label>
        );
    }

}

export {CheckBox, DateField};
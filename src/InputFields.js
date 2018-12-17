import React from 'react';

class CheckBox extends React.Component{
    render(){
        return(
            <label>
                { this.props.text }
                <input type="checkbox" name="thing" checked={ this.props.checked } onChange={ this.props.callback }></input>
            </label>
        );
    }
}

export {CheckBox};
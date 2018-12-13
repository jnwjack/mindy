import React from 'react';
import './css/App.css';

/* TextField

This component is a basic wrapper for a text field input.

*/
class TextField extends React.Component {  
  render() {
    return(
      <div>
        <input type="text" class="form-control" id={ this.props.id } onFocus={ this.handleFocus }
          placeholder={ this.props.default } onChange={ this.props.onChange } value={ this.props.value }/>
      </div>
    );
  }
}

/* TextArea

This component is a basic wrapper for a <textarea> element.

*/
class TextArea extends React.Component {
  render() {
    return(
      <div>
        <textarea class="form-control" id={ this.props.id } onChange={ this.props.onChange }
          placeholder={ this.props.default }value={ this.props.value}/>
      </div>
    );
  }
}

export {TextField, TextArea};
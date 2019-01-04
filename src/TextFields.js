import React from 'react';
import './css/App.css';

/* TextField

This component is a basic wrapper for a text field input.

*/
class TextField extends React.Component {  
  render() {
    return(
      <input type="text" class="text-basic" id={ this.props.id } onFocus={ this.handleFocus }
        placeholder={ this.props.default } onChange={ this.props.onChange } value={ this.props.value }/>
    );
  }
}

/* TextArea

This component is a basic wrapper for a <textarea> element.

*/
class TextArea extends React.Component {
  render() {
    return(
      <textarea id={ this.props.id } onChange={ this.props.onChange }
        placeholder={ this.props.default }value={ this.props.value}/>
    );
  }
}

/* SelectField

This component is a wrapper for a <select> element

*/
class SelectField extends React.Component{
  render(){
    const elements = this.props.elements.map((element) => <option key={ element.key }>{ element.string }</option>);

    return(
      <select id={ this.props.id } size={ this.props.maximum } onChange={ this.props.onChange } disabled={ this.props.disabled }>{ elements }</select>
    )
  }
}

export { TextField, TextArea, SelectField };
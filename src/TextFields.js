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

/* SelectField

This component is a wrapper for a <select> element

*/
class SelectField extends React.Component{
  render(){
    const elements = this.props.elements.map((element) => <option key={ element.key }>{ element.string }</option>);

    return(
      <select id={ this.props.id } class="form-control" size={ this.props.maximum } onChange={ this.props.onChange } disabled={ this.props.disabled }>{ elements }</select>
    )
  }
}

export { TextField, TextArea, SelectField };
import React from 'react';
import logo from './logo.svg';
import './App.css';


// props.default
class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmptyAndBlurred: true
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }

  handleFocus() {
    this.setState({
      isEmptyAndBlurred: false
    });
  }

  handleBlur() {
    if(this.props.value === "") {
      this.setState({
        isEmptyAndBlurred: true
      });
    }
  }

  renderPlaceholder() {
    return(
      <input type="text" class="form-control tfield" id={this.props.id} onFocus={ this.handleFocus }
          onBlur={ this.handleBlur } onChange={ this.props.onChange } value={this.props.default}/>
    );
  }

  renderValue() {
    return(
      <input type="text" class="form-control tfield" id={this.props.id} onFocus={ this.handleFocus }
          onBlur={ this.handleBlur } onChange={ this.props.onChange } value={this.props.value}/>
    );
  }

  render() {
    const isEmptyAndBlurred = this.state.isEmptyAndBlurred;
    return(
      <div>
        {isEmptyAndBlurred ? this.renderPlaceholder() : this.renderValue()}
      </div>
    );
  }
}

class ListBox extends React.Component {
  render() {
    const elements = this.props.elements.map((element) => <option>{ element }</option>);
    return(
      <div>
        <select class="form-control" id="listbox" size={ this.props.maximum }>{ elements }</select>
      </div>
    );
  }
}

class TextBox extends React.Component {
  render() {
    return(
      <div>
        <textarea class="form-control" id="message" />
      </div>
    );
  }
}


class Recipient extends React.Component {
  render() {
    return(
      <div id="recipient">
        <TextField id="recipient-text" default="Recipient email" value={ this.props.value } onChange={ this.props.onChange } />
        <input type="button" class="btn btn-primary" value="Add" onClick={ this.props.onAdd } />
      </div>
    )
  }
}

// for next part, use html <textarea>

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      recipients: []
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleAdd(event) {
    const temp = this.state.recipients;
    temp.push(this.state.email);
    this.setState({
      email: "",
      recipients: temp
    });
  }
 
  handleSend(event) {
      let xhr = new XMLHttpRequest();
      let name = this.state.name;
      xhr.open("POST", 'email.php', true);
      
      xhr.send("name="+name);
  }

  render() {
    return(
      <div id="main">
        <TextField onChange={ this.handleNameChange } value={ this.state.name } default="Who is sending this reminder?" />
        <Recipient value={ this.state.email } onChange={ this.handleEmailChange } onAdd={ this.handleAdd }/>
        <ListBox elements={ this.state.recipients } maximum={ 7 }/>
        <TextBox />
        <input type="button" class="btn btn-primary" value="Send" onClick={ this.handleSend }/>
      </div>
    )
  }
}

export default Box;

import React from 'react';

import text from './image/text.png';
import {TextField, TextArea} from './TextFields.js';
import Notification from './Notification.js';
import {CheckBox, DateField} from "./InputFields.js";
import './css/App.css';


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


/* ListBox

This component contains a SelectField for storing user emails, as well as a button for deleting emails
from the list.

*/
class ListBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: -1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event){
    this.setState({
      selected: event.target.selectedIndex
    });
  }

  render() {
    let currentElement = this.state.selected;
    return(
      <div>
        <SelectField id="listbox" maximum={ this.props.maximum } onChange={ this.handleSelect }elements = { this.props.elements }></SelectField>
        <input type="button" class="btn btn-primary" id="listbox-button" value="Remove" onClick={ (e) => this.props.onDelete(currentElement, e) }></input>
      </div>
    );
  }
}

/* Recipient

This component uses a TextField and a button to add new user emails to the list of recipients.

*/
class Recipient extends React.Component {
  render() {
    return(
      <div id="recipient">
        <TextField id="recipient-text" default="Recipient email" value={ this.props.value } onChange={ this.props.onChange } />
        <input type="button" class="btn btn-primary" id="recipient-button" value="Add" onClick={ this.props.onAdd } />
      </div>
    )
  }
}

/* Image

This component is a basic wrapper used for displaying an image.

*/

class Image extends React.Component {
  render(){
    return(
      <div class="image">
        <img src={ this.props.src } alt={ this.props.alt } id={ this.props.id }></img>
      </div>
    );
  }
}


/* SideBox

This box lies to the right side of the page.

*/
class SideBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // using 1/0 instead of true/false so we can use it to set field properties
      repeated: 0
    };

    
    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(event){
    const repeated_previous = this.state.repeated;
    this.setState({
      repeated: !repeated_previous
    });
  }

  render(){
    const repeated = this.state.repeated;
    const options = [{string: "Daily", key: 0}, {string: "Weekly", key: 1}, {string: "Monthly", key: 2}, {string: "Specific days", key: 3}];

    return(    
      <div class="box-basic box-side" id={ this.props.tid }>
        <DateField text="Send reminder on:"></DateField>
        <CheckBox text="Repeat?" checked={ repeated } callback={ this.onCheck }></CheckBox>
        <SelectField disabled={ !repeated } elements={ options }></SelectField>
      </div>
    );
  }
}

/* MainBox

This component is the main container for all components (so far).
It renders all components and maintains the state for all of the fields for the current email.

*/
class MainBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      recipients: [],
      body: "",
      count: 0,
      notificationActive: false
    };

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.reset = this.reset.bind(this);
    this.notificationEnd = this.notificationEnd.bind(this);
  }

  notificationEnd(){
    this.setState({
      notificationActive: false
    });
  }

  handleDelete(element, event){
    const temp = this.state.recipients;
    temp.splice(element, 1);
    this.setState({
      recipients: temp
    });
  }
    
  handleBodyChange(event){
      this.setState({
        body: event.target.value
      });
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
    let id = this.state.count;
    temp.push({string: this.state.email, key: id});
    this.setState({
      email: "",
      recipients: temp,
      count: id+1
    });
  }

  reset(){
    this.setState({
      email: "",
      recipients: [],
      body: "",
      name: "",
      notificationActive: true
    });
  }
 
  handleSend(event) {
      let xhr = new XMLHttpRequest();
      let name = this.state.name;

      let recipients = this.state.recipients;
      let emails = recipients.map((element) => element.string);
      let body = this.state.body;

      xhr.open("POST", "email.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = this.reset;
      xhr.send("name="+name+"&recipients="+emails+"&body="+body);
  }

  render() {
    let notificationActive = this.state.notificationActive;

    return(
      <div id="main" class="box-basic">
        <Image src={ text } alt="Mindy Text" id="image-text"></Image>
        <TextField onChange={ this.handleNameChange } value={ this.state.name } default="Who is sending this reminder?" />
        <Recipient value={ this.state.email } onChange={ this.handleEmailChange } onAdd={ this.handleAdd }/>
        <ListBox elements={ this.state.recipients } maximum={ 7 } onDelete={ this.handleDelete }/>
        <TextArea id="message" onChange={ this.handleBodyChange } value={ this.state.body } default="Enter email body here."/>
        <input type="button" class="btn btn-primary" value="Send" onClick={ this.handleSend }/>
        <Notification active={ notificationActive } callback={ this.notificationEnd }></Notification>
      </div>
    )
  }
}

export {MainBox, SideBox};

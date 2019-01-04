import React from 'react';
import text from './image/text.png';
import { TextField, TextArea, SelectField } from './TextFields.js';
import { IntervalField, DateField, TimeField } from "./InputFields.js";
import './css/App.css';



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
        <SelectField id="listbox" maximum={ this.props.maximum } onChange={ this.handleSelect } elements={ this.props.elements }></SelectField>
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
      <img src={ this.props.src } alt={ this.props.alt } class="image" id={ this.props.id }></img>
    );
  }
}


/* SideBox

This box lies to the right side of the page.

*/
class SideBox extends React.Component {
  render(){
    const callbacks = this.props.callbacks;
    const repeated = this.props.repeated;
    const options = [{string: "Daily", key: 0}, {string: "Weekly", key: 1}, {string: "Monthly", key: 2}, {string: "Specific days", key: 3}];
    const date = this.props.date;
    const time = this.props.time;
    const repeats = this.props.repeats;

    return(    
      <div class="box-basic box-side" id={ this.props.tid }>
        <DateField text="Send reminder on:" callback={ callbacks["date"] } value={ date }></DateField>
        <TimeField text="Send at time:" callback={ callbacks["time"] } value={ time }></TimeField>
        <IntervalField text="Repeat?" checked={ repeated } checkbox_callback={ callbacks["check"] }
          interval_callback={ callbacks["interval"] } max={ "100" } elements={ options } repeats_callback={ callbacks["repeats"]}
          repeat_default="How many times?" repeats={ repeats }></IntervalField>
      </div>
    );
  }
}

/* InfoBox

This component is a box that holds information about this
project and lies to the left side of the window.

*/
class InfoBox extends React.Component{
  render(){
    return(
      <div class="box-basic box-side" id={ this.props.id }>
        <p>Mindy is a simple email-based reminder service.
          It is written in ReactJS and uses the LAMP stack.
        </p>
      </div>
    )
  }
}


/* MainBox

This component is placed in the center of the window and
renders components for the composition of the email.

*/
class MainBox extends React.Component {
  render() {
    const callbacks = this.props.callbacks;
    const body = this.props.body;
    const email = this.props.email;
    const name = this.props.name;
    const recipients = this.props.recipients;

    return(
      <div id="main-wrapper">
        <div id ="main" class="box-basic">
          <Image src={ text } alt="Mindy Text" id="image-text"></Image>
          <TextField onChange={ callbacks["name"] } value={ name } default="Who is sending this reminder?" />
          <Recipient value={ email } onChange={ callbacks["email"] } onAdd={ callbacks["add"] }/>
          <ListBox elements={ recipients } maximum={ 7 } onDelete={ callbacks["delete"] }/>
          <TextArea id="message" onChange={ callbacks["body"] } value={ body } default="Enter email body here."/>
          <input type="button" class="btn btn-primary" value="Send" onClick={ callbacks["send"] }/>
        </div>
      </div>
    )
  }
}

export { InfoBox, MainBox, SideBox, Image };

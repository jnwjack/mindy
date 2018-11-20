import React from 'react';
import logo from './logo.svg';
import './css/App.css';


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
      <input type="text" class="form-control tfield" id={ this.props.id } onFocus={ this.handleFocus }
          onBlur={ this.handleBlur } onChange={ this.props.onChange } value={ this.props.default }/>
    );
  }

  renderValue() {
    return(
      <input type="text" class="form-control tfield" id={ this.props.id } onFocus={ this.handleFocus }
          onBlur={ this.handleBlur } onChange={ this.props.onChange } value={ this.props.value }/>
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

class SelectField extends React.Component{
  render(){
    return(
      <select id={ this.props.id } class="form-control" size={ this.props.maximum } onChange={ this.props.onChange }>{ this.props.elements }</select>
    )
  }
}

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
    const elements = this.props.elements.map((element) => <option key={ element.key }>{ element.email }</option>);
    let currentElement = this.state.selected;
    return(
      <div>
        <SelectField id="listbox" maximum={ this.props.maximum } onChange={ this.handleSelect }elements = { elements }></SelectField>
        <input type="button" class="btn btn-primary" id="listbox-button" value="Remove" onClick={ (e) => this.props.onDelete(currentElement, e) }></input>
      </div>
    );
  }
}

class TextBox extends React.Component {
  render() {
    return(
      <div>
        <textarea class="form-control" id="message" value={ this.props.value } onChange={ this.props.onChange } />
      </div>
    );
  }
}


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

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      recipients: [],
      body: "",
      count: 0
    };

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    temp.push({email: this.state.email, key: id});
    this.setState({
      email: "",
      recipients: temp,
      count: id+1
    });
  }
 
  handleSend(event) {
      let xhr = new XMLHttpRequest();
      let name = this.state.name;

      let recipients = this.state.recipients;
      let emails = recipients.map((element) => element.email);

      let body = this.state.body;
      xhr.open("POST", "email.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function(){
          this.setState({
            name: "",
            recipients: [],
            email: "",
            body: ""
          });
          /*if(xhr.readyState == 4 && xhr.status==200){
              this.setState({
                  name: "",
                  recipients: [],
                  email: "",
                  body: ""
              });
           this.forceUpdate();
           alert(this.state.name);
          }*/
      };
      xhr.send("name="+name+"&recipients="+emails+"&body="+body);
  }

  render() {
    return(
      <div id="main">
        <TextField onChange={ this.handleNameChange } value={ this.state.name } default="Who is sending this reminder?" />
        <Recipient value={ this.state.email } onChange={ this.handleEmailChange } onAdd={ this.handleAdd }/>
        <ListBox elements={ this.state.recipients } maximum={ 7 } onDelete={ this.handleDelete }/>
        <TextBox onChange={ this.handleBodyChange} value={ this.state.body}/>
        <input type="button" class="btn btn-primary" value="Send" onClick={ this.handleSend }/>
      </div>
    )
  }
}

export default Box;

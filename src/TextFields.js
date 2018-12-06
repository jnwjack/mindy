import React from 'react';
import './css/App.css';

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
      return(<input type="text" class="form-control" id={ this.props.id } onFocus={ this.handleFocus }
        onBlur={ this.handleBlur } onChange={ this.props.onChange } value={ this.props.default }/>);
    }
  
    renderValue() {
      return(<input type="text" class="form-control" id={ this.props.id } onFocus={ this.handleFocus }
        onBlur={ this.handleBlur } onChange={ this.props.onChange } value={ this.props.value }/>);
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

  class TextArea extends React.Component {
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
        return(<textarea class="form-control" id={ this.props.id } onFocus={ this.handleFocus }
            onBlur={ this.handleBlur } onChange={ this.props.onChange } value={ this.props.default}/>);
    }

    renderValue() {
        return(<textarea class="form-control" id={ this.props.id } onFocus={ this.handleFocus }
            onBlur={ this.handleBlur } onChange={ this.props.onChange } value={ this.props.value }/>);
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

export {TextField, TextArea};
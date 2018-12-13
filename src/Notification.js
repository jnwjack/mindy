import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

/* NotificationBanner

This component is for the banner used by notifictaion

*/
class NotificationBanner extends React.Component {
    render(){
        return( 
            <div class="notification-block" key={ this.props.key }>
                <div class="notification-text">{ this.props.value }</div>
            </div>
        );
    }
}

/* Notification

This component displays a banner that fades in and fades out when 'active'

*/
class Notification extends React.Component {
    render(){
      let element;
      if(this.props.active) {
        element = <NotificationBanner value="Email sent!" key={ 1 }></NotificationBanner>
        this.props.callback()
      }
      else {
        element = <div key={ 0 }></div>;      
      }
      return(
          <CSSTransitionGroup
            transitionName="notification"
            transitionEnter={ true }
            transitionLeave={ true }
            transitionEnterTimeout={ 1500 }
            transitionLeaveTimeout={ 1500 }>
            { element }
          </CSSTransitionGroup>
      )
    }
  }

  export default Notification
import React from 'react';

/* Notification

This component displays a banner that fades in and fades out when 'active'

*/
class Notification extends React.Component {
    render(){
        const active = this.props.active;
        let active_class;
        if(active){
            active_class = "notification-block notification-active";
            setTimeout(this.props.callback, 1000);
        }
        else{
            active_class = "notification-block notification-inactive";
        }

        return(
            <div class={active_class}>
                <div class="notification-text">{ this.props.text }</div>
            </div>
        )
    }
}

  export default Notification;
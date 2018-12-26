import React from "react";
import { InfoBox, MainBox, SideBox } from "./Boxes";
import Notification from './Notification.js';

/* Mindy

This component is the global component that stores all state values
relevant to the email.

*/
class Mindy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            recipients: [],
            body: "",
            count: 0,
            notificationActive: false,

            // using 1/0 instead of true/false so we can use it to set field properties
            repeated: 0,
            time: null,
            date: null,
            interval: "N/A"
        };

        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.reset = this.reset.bind(this);
        this.notificationEnd = this.notificationEnd.bind(this);

            
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleInterval = this.handleInterval.bind(this);
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
        let repeats = this.state.repeated;
        let interval = this.state.interval;
        let time = this.state.time;
        let date = this.state.date;

        xhr.open("POST", "schedule.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = this.reset;
        xhr.send("name="+name+"&recipients="+emails+"&body="+body+"&repeats="+repeats+"&interval="+interval+
            "&time="+time+"&date="+date);
    }


    handleCheck(event){
        const repeated_previous = this.state.repeated;
        if(repeated_previous){
            this.setState({
                repeated: 0,
                interval: "N/A"
            });
        }
        else{
            this.setState({
                repeated: 1,
            });
        }
    }

    handleInterval(event){
        if(event.target.value === "Specific days"){
            this.setState({
                interval: "N/A"
            });
        }
        else{
            this.setState({
                interval: event.target.value
            });
        }
    }
    
    handleDate(event){
        this.setState({
          date: event.target.value
        });
    }
    
    handleTime(event){
        this.setState({
          time: event.target.value
        });
    }

    render(){
        const mainbox_callbacks = {
            "delete": this.handleDelete,
            "add"   : this.handleAdd,
            "body"  : this.handleBodyChange,
            "email" : this.handleEmailChange,
            "name"  : this.handleNameChange,
            "send"  : this.handleSend,
        };

        const sidebox_callbacks = {
            "check" : this.handleCheck,
            "date"  : this.handleDate,
            "time"  : this.handleTime,
            "interval": this.handleInterval
        };

        const notificationActive = this.state.notificationActive;

        const name = this.state.name;
        const email = this.state.email;
        const recipients = this.state.recipients;
        const body = this.state.body;

        const date = this.state.date;
        const time = this.state.time;
        const repeated = this.state.repeated;

        return(
            <div id="global-wrapper">
                <InfoBox id="box-left"></InfoBox>
                <MainBox callbacks={ mainbox_callbacks } notificationActive={ notificationActive }
                    body={ body } name={ name } email={ email } recipients={ recipients }></MainBox>
                <Notification active={ notificationActive } callback={ this.notificationEnd }></Notification>
                <SideBox callbacks={ sidebox_callbacks } date={ date } repeated={ repeated }
                    time={ time } tid="box-right"></SideBox>
            </div>
        );
    }
}

export default Mindy;
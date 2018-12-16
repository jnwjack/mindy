import React from "react";
import {MainBox, SideBox} from "./Boxes";


class Mindy extends React.Component{
    render(){
        return(
            <div>
                <SideBox tid="box-left"></SideBox>
                <MainBox></MainBox>
                <SideBox tid="box-right"></SideBox>
            </div>
        );
    }
}

export default Mindy;
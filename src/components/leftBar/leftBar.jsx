import React, {Component} from 'react'
import LeftBarTitle from './leftBarTitle'
import ProjectListBox from "./projectListBox"

export default class LeftBar extends Component{

    render(){
        return(
            <div>
                <div className="leftBar">
                    <LeftBarTitle></LeftBarTitle>
                    <ProjectListBox></ProjectListBox>
                </div>
            </div>
        )
    }

}
import React, {Component} from 'react'
import ProjectDistributionByType from './projectDistributionByType'
import ProjectDistributionByArea from './projectDistributionByArea'
import ProjectDistributionByTime from './projectDistributionByTime'

export default class RightBar extends Component{

    render(){
        return(
            <div>
                <div className="rightBar">
                    <ProjectDistributionByType></ProjectDistributionByType>
                    <ProjectDistributionByArea></ProjectDistributionByArea>
                    <ProjectDistributionByTime></ProjectDistributionByTime>
                </div>
            </div>
        )
    }

}
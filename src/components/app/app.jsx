import React, {Component} from 'react'

import Title from '../title/title'
import LeftBar from '../leftBar/leftBar'
import Map from '../map/map'
import RightBar from '../rightBar/rightBar'
import '../../css/app.css'

export default class App extends Component{

    render(){
        // 这里的className不生效
        return(
            <div>
                <Title className="title"></Title>
                <LeftBar className="chartLeft"></LeftBar>
                <Map className="map"></Map>
                <RightBar className="chartRight"></RightBar>
            </div>
        )
    }

}
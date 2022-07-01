import React, {Component} from 'react'
import { connect } from 'react-redux'
// import echarts from 'echarts'
import axios from 'axios'
import 'echarts/extension/bmap/bmap'
import { Map, Marker, Label } from 'react-bmapgl'

class MapContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            centerLng: 0,
            centerLat: 0,
            projectCoordinateArray: [],
            projectNameArray: [],
            zoom: 6
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { projectCoordinateArray, projectNameArray } = this.state
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;

                projectCoordinateArray = data.map((item) => {
                    return Object.assign({}, {'lng': item.lng, 'lat': item.lat})
                })
                projectNameArray = data.map(item => {return item.name});
                
                this.setState({
                    projectCoordinateArray,
                    projectNameArray
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onClickMap = e => {
        console.log(e.currentTarget.getZoom())
        return e.currentTarget.getZoom()
    }

    render(){
        let { centerLng, centerLat, projectCoordinateArray, projectNameArray, zoom } = this.state
        const urlProjectInformation = '../../../data/projectInformation.json'
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                const nameDataArray = data.map(item => {return item.name});
                const lngDataArray = data.map(item => {return item.lng});
                const latDataArray = data.map(item => {return item.lat});
                const zoomDataArray = data.map(item => {return item.zoom});
                centerLng = lngDataArray[nameDataArray.indexOf(this.props.project)]
                centerLat = latDataArray[nameDataArray.indexOf(this.props.project)]
                // zoom = this.props.zoom
                zoom = zoomDataArray[nameDataArray.indexOf(this.props.project)]
                this.setState({
                    centerLng,
                    centerLat,
                    zoom
                });
            })
            .catch((error) => {
                console.log(error);
            });
        const markerArray = []
        const labelArray = []
        for (let i = 0; i < projectCoordinateArray.length; i++) {
            markerArray.push(
                <Marker
                    key={i}
                    position={new window.BMapGL.Point(projectCoordinateArray[i].lng, projectCoordinateArray[i].lat)}
                />
            )
        }
        for (let j = 0; j < projectNameArray.length; j++) {
            labelArray.push(
                <Label
                    key={j}
                    position={new window.BMapGL.Point(projectCoordinateArray[j].lng, projectCoordinateArray[j].lat)}
                    text={projectNameArray[j]}
                />
            )
        }

        return(
            <div>
                <div id="mapDiv" className="mapContainer">
                    <Map
                        center={new window.BMapGL.Point(centerLng, centerLat)}
                        style={{ height: '100%' }}
                        zoom={zoom}
                        onClick={this.onClickMap}
                        enableScrollWheelZoom
                    >
                        {markerArray}
                        {labelArray}
                    </Map>
                    
                </div>
                {/* <div className="mapContainer">
                    <span>地图部分</span>
                    <h2>测试内容：{this.props.project}</h2>
                </div> */}
            </div>
        )
    }

}

export default connect(
    state => ({ 
        project: state.projectName,
        zoom: state.zoom
    })
)(MapContainer);
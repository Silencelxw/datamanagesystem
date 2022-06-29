import React, {Component} from 'react'
import { connect } from 'react-redux'
// import echarts from 'echarts'
import axios from 'axios'
import 'echarts/extension/bmap/bmap'
import { Map, Marker } from 'react-bmapgl'

class MapContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            centerLng: 0,
            centerLat: 0,
            projectCoordinateArray: []
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { projectCoordinateArray } = this.state
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;

                projectCoordinateArray = data.map((item) => {
                    return Object.assign({}, {'lng': item.lng, 'lat': item.lat})
                })

                this.setState({
                    projectCoordinateArray
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        let { centerLng, centerLat, projectCoordinateArray } = this.state
        const urlProjectInformation = '../../../data/projectInformation.json'
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                const nameDataArray = data.map(item => {return item.name});
                const lngDataArray = data.map(item => {return item.lng});
                const latDataArray = data.map(item => {return item.lat});
                centerLng = lngDataArray[nameDataArray.indexOf(this.props.project)]
                centerLat = latDataArray[nameDataArray.indexOf(this.props.project)]
                this.setState({
                    centerLng,
                    centerLat
                });
            })
            .catch((error) => {
                console.log(error);
            });
        const markerArray = []
        for (let i = 0; i < projectCoordinateArray.length; i++) {
            markerArray.push(
                <Marker
                    key={i}
                    position={new window.BMapGL.Point(projectCoordinateArray[i].lng, projectCoordinateArray[i].lat)}
                />
            )
        }

        return(
            <div>
                <div id="mapDiv" className="mapContainer">
                    <Map
                        center={new window.BMapGL.Point(centerLng, centerLat)}
                        style={{ height: '100%' }}
                        zoom={6}
                        onClick={e => console.log(e)}
                        enableScrollWheelZoom
                    >
                        {markerArray}
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
    state => ({ project: state.projectName })
)(MapContainer);
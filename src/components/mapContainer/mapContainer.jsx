import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import 'echarts/extension/bmap/bmap'
import { Map, Marker, Label, InfoWindow } from 'react-bmapgl'

class MapContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            centerLng: 0,
            centerLat: 0,
            projectCoordinateArray: [],
            projectNameArray: [],
            projectAreaArray: [],
            projectOwnerArray: [],
            projectManagerArray: [],
            projectMemberArray: [],
            projectIntroductionArray: [],
            projectWorkphoto1Array: [],
            projectWorkphoto2Array: [],
            infoWindowArry: [],
            icon: 'loc_red',
            zoom: 6,
            mapType: "earth"
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { projectCoordinateArray, projectNameArray, projectAreaArray, projectOwnerArray, projectManagerArray, projectMemberArray, projectIntroductionArray, projectWorkphoto1Array, projectWorkphoto2Array } = this.state
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;

                projectCoordinateArray = data.map((item) => {
                    return Object.assign({}, {'lng': item.lng, 'lat': item.lat})
                })
                projectNameArray = data.map(item => {return item.name});
                projectAreaArray = data.map(item => {return item.area});
                projectOwnerArray = data.map(item => {return item.owner});
                projectManagerArray = data.map(item => {return item.manager});
                projectMemberArray = data.map(item => {return item.member});
                projectIntroductionArray = data.map(item => {return item.introduction});
                projectWorkphoto1Array = data.map(item => {return item.workphoto1});
                projectWorkphoto2Array = data.map(item => {return item.workphoto2});
                
                this.setState({
                    projectCoordinateArray,
                    projectNameArray,
                    projectAreaArray,
                    projectOwnerArray,
                    projectManagerArray,
                    projectMemberArray,
                    projectIntroductionArray,
                    projectWorkphoto1Array,
                    projectWorkphoto2Array
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // ??????????????????????????????????????????value????????????????????????n???????????????
    roundFun(value, n) {
        return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
    }

    // ??????????????????
    onClickMap = e => {
        // console.log(e.currentTarget.getZoom())

        let { infoWindowArry } = this.state
        infoWindowArry.pop()
        this.setState({
            infoWindowArry
        });
    }

    // ??????button????????????
    onClickButtonTest = () => {
        console.log('??????')
    }

    // ?????????????????????
    onClickMarker = e => {
        // console.log(e)
        let { projectCoordinateArray, projectNameArray, projectAreaArray, projectOwnerArray, projectManagerArray, projectMemberArray, projectIntroductionArray, projectWorkphoto1Array, projectWorkphoto2Array, infoWindowArry } = this.state
        const urlProjectInformation = '../../../data/projectInformation.json'
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                const lngDataArray = data.map(item => {return item.lng});
                // ???????????????????????????????????????
                const clickIndex = lngDataArray.indexOf(this.roundFun(e.currentTarget.latLng.lng, 6));
                // console.log(clickIndex)

                infoWindowArry.pop()
                infoWindowArry.push(
                    <InfoWindow
                        key={clickIndex}
                        position={new window.BMapGL.Point(projectCoordinateArray[clickIndex].lng, projectCoordinateArray[clickIndex].lat)}
                        offset={new window.BMapGL.Size(0, -35)}
                        width={600}
                        height={510}
                        title={projectNameArray[clickIndex]}
                    >
                        <span>???????????????{projectAreaArray[clickIndex]}</span>
                        <br />
                        <span>???????????????{projectOwnerArray[clickIndex]}</span>
                        <br />
                        <span>???????????????{projectManagerArray[clickIndex]}</span>
                        <br />
                        <span>???????????????{projectMemberArray[clickIndex]}</span>
                        <br />
                        <span>???????????????{projectIntroductionArray[clickIndex]}</span>
                        <br />
                        <img style={{width: '270px', height: '200px', borderRadius: '10px', boxShadow: '5px 5px 5px #888888', margin: '10px'}} src={projectWorkphoto1Array[clickIndex]} alt="" />
                        <img style={{width: '270px', height: '200px', borderRadius: '10px', boxShadow: '5px 5px 5px #888888', margin: '10px'}} src={projectWorkphoto2Array[clickIndex]} alt="" />
                        <br />
                    </InfoWindow>
                )
                this.setState({
                    infoWindowArry
                });

            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        let { centerLng, centerLat, projectCoordinateArray, projectNameArray, zoom, infoWindowArry, mapType } = this.state
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
                    icon={this.state.icon}
                    position={new window.BMapGL.Point(projectCoordinateArray[i].lng, projectCoordinateArray[i].lat)}
                    onClick={this.onClickMarker}
                />
            )
        }
        for (let j = 0; j < projectNameArray.length; j++) {
            labelArray.push(
                <Label
                    key={j}
                    position={new window.BMapGL.Point(projectCoordinateArray[j].lng, projectCoordinateArray[j].lat)}
                    offset={new window.BMapGL.Size(-20, -40)}
                    text={projectNameArray[j]}
                    style={{
                        color: 'red',
                        webkitTextStroke: '0.2px blue',
                        fontSize : '14px',
                        border: 'none',
                        background: 'none'
                    }}
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
                        mapType={mapType}
                        onClick={this.onClickMap}
                        enableScrollWheelZoom
                    >
                        {/* <InfoWindow
                            position={new window.BMapGL.Point(centerLng, centerLat)}
                            title="??????"
                            text="????????????????????????"
                        /> */}

                        {infoWindowArry}
                        {markerArray}
                        {labelArray}
                    </Map>
                    
                </div>
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
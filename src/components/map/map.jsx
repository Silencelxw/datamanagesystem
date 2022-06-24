import React, {Component} from 'react'
import { connect } from 'react-redux';

class Map extends Component{

    componentDidMount() {
        // console.log(this.props);
    }

    render(){
        return(
            <div>
                <div className="map">
                    <span>地图部分</span>
                    <h2>测试内容：{this.props.project}</h2>
                </div>
            </div>
        )
    }

}

export default connect(
    state => ({ project: state.projectName })
)(Map);
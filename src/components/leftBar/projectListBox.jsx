import React, { Component } from 'react'
import { Radio } from "antd"
import ProjectListBoxByType from './projectListBoxByType'
import ProjectListBoxByArea from './projectListBoxByArea'
import ProjectListBoxByTime from './projectListBoxByTime'
import 'antd/lib/radio/style/css'
import 'antd/lib/collapse/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/typography/style/css'

export default class ProjectListBox extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }

    // 单选框点击回调事件
    onChange = (e) => {
        console.log(e.target.value)
    }

    onChangeByType = () => {
        this.setState({
            value: 1
        });
    }

    onChangeByArea = () => {
        this.setState({
            value: 2
        });
    }

    onChangeByTime = () => {
        this.setState({
            value: 3
        });
    }

    // 列表展开项点击回调事件
    onClick = (e) => {
        console.log(e.target.innerText)
    }

    render(){
        return(
            <div>
                <div className="projectListBox">
                    <div className='projectListBox-radio'>
                        <Radio.Group defaultValue={'type'}>
                            <Radio onChange={this.onChangeByType} value={'type'}>按类型查看</Radio>
                            <Radio onChange={this.onChangeByArea} value={'area'}>按地区查看</Radio>
                            <Radio onChange={this.onChangeByTime} value={'time'}>按时间查看</Radio>
                        </Radio.Group>
                    </div>
                    {this.state.value === 1 && (<ProjectListBoxByType />)}
                    {this.state.value === 2 && (<ProjectListBoxByArea />)}
                    {this.state.value === 3 && (<ProjectListBoxByTime />)}
                </div>
            </div>
        )
    }

}
import React, { Component } from 'react'
import axios from 'axios'
import { Collapse, List, Typography  } from "antd"
import 'antd/lib/radio/style/css'
import 'antd/lib/collapse/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/typography/style/css'

export default class ProjectListBoxByType extends Component{

    constructor(props) {
        super(props);
        this.state = {
            jccyProjectData: [],
            jgldProjectData: [],
            jcyjProjectData: [],
            swjmProjectData: [],
            otherProjectData: []
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { jccyProjectData, jgldProjectData, jcyjProjectData, swjmProjectData, otherProjectData } = this.state
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                let typeDataArray = data.map(item => {return item.type})
                let nameDataArray = data.map(item => {return item.name})
                for (let i = 0; i < typeDataArray.length; i++) {
                    switch (typeDataArray[i]) {
                        case '基础测绘':
                            jccyProjectData.push(nameDataArray[i])
                            break;
                        case '激光雷达':
                            jgldProjectData.push(nameDataArray[i])
                            break;
                        case '监测预警':
                            jcyjProjectData.push(nameDataArray[i])
                            break;
                        case '三维建模':
                            swjmProjectData.push(nameDataArray[i])
                            break;
                        default:
                            otherProjectData.push(nameDataArray[i])
                            break;
                    }
                    
                }
                this.setState({
                    jccyProjectData,
                    jgldProjectData,
                    jcyjProjectData,
                    swjmProjectData,
                    otherProjectData
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // 列表展开项点击回调事件
    onClick = (e) => {
        console.log(e.target.innerText)
    }

    render(){
        let { jccyProjectData, jgldProjectData, jcyjProjectData, swjmProjectData, otherProjectData } = this.state
        return(
            <div>
                <div className="projectListBox">
                    <div className='projectListBox-list'>
                        <Collapse
                            expandIcon={
                                ({ isActive }) => <img src={isActive ? '../../../img/folderOpen.png' : '../../../img/folder.png'} alt="" />
                            }
                            accordion
                            ghost
                            bordered={false}
                        >
                            <Collapse.Panel header="基础测绘类项目" key="1">
                                <List
                                    split={false}
                                    dataSource={jccyProjectData}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                            <Collapse.Panel header="激光雷达类项目" key="2">
                                <List
                                    split={false}
                                    dataSource={jgldProjectData}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                            <Collapse.Panel header="监测预警类项目" key="3">
                                <List
                                    split={false}
                                    dataSource={jcyjProjectData}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                            <Collapse.Panel header="三维建模类项目" key="4">
                                <List
                                    split={false}
                                    dataSource={swjmProjectData}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                            <Collapse.Panel header="其他项目" key="5">
                                <List
                                    split={false}
                                    dataSource={otherProjectData}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }

}
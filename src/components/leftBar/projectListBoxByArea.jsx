import React, { Component } from 'react'
import axios from 'axios'
import { Collapse, List, Typography  } from "antd"
import 'antd/lib/radio/style/css'
import 'antd/lib/collapse/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/typography/style/css'

export default class ProjectListBoxByArea extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cdProjectData: [],
            pxProjectData: [],
            cxProjectData: [],
            xzProjectData: [],
            cqProjectData: [],
            otherProjectData: []
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { cdProjectData, pxProjectData, cxProjectData, xzProjectData, cqProjectData, otherProjectData } = this.state
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                let areaDataArray = data.map(item => {return item.area})
                let nameDataArray = data.map(item => {return item.name})
                for (let i = 0; i < areaDataArray.length; i++) {
                    switch (areaDataArray[i]) {
                        case '成都':
                            cdProjectData.push(nameDataArray[i])
                            break;
                        case '攀西':
                            pxProjectData.push(nameDataArray[i])
                            break;
                        case '川西':
                            cxProjectData.push(nameDataArray[i])
                            break;
                        case '西藏':
                            xzProjectData.push(nameDataArray[i])
                            break;
                        case '重庆':
                            cqProjectData.push(nameDataArray[i])
                            break;
                        default:
                            otherProjectData.push(nameDataArray[i])
                            break;
                    }
                    
                }
                this.setState({
                    cdProjectData,
                    pxProjectData,
                    cxProjectData,
                    xzProjectData,
                    cqProjectData,
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
        let { cdProjectData, pxProjectData, cxProjectData, xzProjectData, cqProjectData, otherProjectData } = this.state
        return(
            <div>
                <div className='projectListBox-list'>
                    <Collapse
                        expandIcon={
                            ({ isActive }) => <img src={isActive ? '../../../img/folderOpen.png' : '../../../img/folder.png'} alt="" />
                        }
                        accordion
                        ghost
                        bordered={false}
                    >
                        <Collapse.Panel header="成都地区项目" key="1">
                            <List
                                split={false}
                                dataSource={cdProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="攀西地区项目" key="2">
                            <List
                                split={false}
                                dataSource={pxProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="川西地区项目" key="3">
                            <List
                                split={false}
                                dataSource={cxProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="西藏地区项目" key="4">
                            <List
                                split={false}
                                dataSource={xzProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="重庆地区项目" key="5">
                            <List
                                split={false}
                                dataSource={cqProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="其他地区项目" key="6">
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
        )
    }

}
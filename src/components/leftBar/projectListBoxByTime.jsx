import React, { Component } from 'react'
import axios from 'axios'
import { Collapse, List, Typography  } from "antd"
import 'antd/lib/radio/style/css'
import 'antd/lib/collapse/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/typography/style/css'

import { connect } from 'react-redux'
import { onClickProjectName } from '../../redux/actions/clickProjectName'
import { onChangeZoom } from '../../redux/actions/changeZoom'


class ProjectListBoxByTime extends Component{

    constructor(props) {
        super(props);
        this.state = {
            project2018Data: [],
            project2019Data: [],
            project2020Data: [],
            project2021Data: [],
            project2022Data: []
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { project2018Data, project2019Data, project2020Data, project2021Data, project2022Data } = this.state
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                let timeDataArray = data.map(item => {return item.time})
                let nameDataArray = data.map(item => {return item.name})
                for (let i = 0; i < timeDataArray.length; i++) {
                    switch (timeDataArray[i]) {
                        case 2018:
                            project2018Data.push(nameDataArray[i])
                            break;
                        case 2019:
                            project2019Data.push(nameDataArray[i])
                            break;
                        case 2020:
                            project2020Data.push(nameDataArray[i])
                            break;
                        case 2021:
                            project2021Data.push(nameDataArray[i])
                            break;
                        case 2022:
                            project2022Data.push(nameDataArray[i])
                            break;
                        default:
                            break;
                    }
                    
                }
                this.setState({
                    project2018Data,
                    project2019Data,
                    project2020Data,
                    project2021Data,
                    project2022Data
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

    onClickProjectName = (data) => {
        // 通知redux
        this.props.onClickProjectName(data);
        this.onChangeZoom()
    }

    onChangeZoom = () => {
        this.props.onChangeZoom();
    }

    render(){
        let { project2018Data, project2019Data, project2020Data, project2021Data, project2022Data } = this.state
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
                        <Collapse.Panel header="2018年项目" key="1">
                            <List
                                split={false}
                                dataSource={project2018Data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="2019年项目" key="2">
                            <List
                                split={false}
                                dataSource={project2019Data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="2020年项目" key="3">
                            <List
                                split={false}
                                dataSource={project2020Data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="2021年项目" key="4">
                            <List
                                split={false}
                                dataSource={project2021Data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="2022年项目" key="5">
                            <List
                                split={false}
                                dataSource={project2022Data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
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


// 暴露容器组件
export default connect(
    // 1.状态
    state => ({ 
        project: state.projectName,
        zoom: state.zoom
    }),
    // 2.方法
    { onClickProjectName, onChangeZoom }
)(ProjectListBoxByTime);
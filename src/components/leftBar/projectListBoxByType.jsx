import React, { Component } from 'react'
import axios from 'axios'
import { Collapse, List, Typography, Modal, message } from "antd"
import 'antd/lib/radio/style/css'
import 'antd/lib/collapse/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/typography/style/css'
import 'antd/lib/modal/style/css'
import 'antd/lib/message/style/css'

import { connect } from 'react-redux'
import { onClickProjectName } from '../../redux/actions/clickProjectName'
import { onChangeZoom } from '../../redux/actions/changeZoom'

// export default class ProjectListBoxByType extends Component{
class ProjectListBoxByType extends Component{

    constructor(props) {
        super(props);
        this.state = {
            jccyProjectData: [],
            jgldProjectData: [],
            jcyjProjectData: [],
            swjmProjectData: [],
            otherProjectData: [],
            infoClickToProjectName: String,
            visibleScgl: false,
            visibleZlgl: false,
            visibleJygl: false
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

    onClickProjectName = (data) => {
        // 通知redux
        this.props.onClickProjectName(data);
        this.onChangeZoom()
    }

    onChangeZoom = () => {
        this.props.onChangeZoom();
    }

    // 项目数据跳转功能弹窗（后续功能研发完成删除）
    alertTest = () => {
        message.info({
            content: '功能正在研发中，敬请期待！',
            style: {
                marginTop: '50px',
            },
        });
    };

    // 显示生产管理信息弹窗
    showScglModal = (e) => {
        let { infoClickToProjectName } = this.state
        infoClickToProjectName = e.currentTarget.parentNode.children[0].innerText
        this.setState({
            infoClickToProjectName,
            visibleScgl: true,
        });
    };

    // 显示质量管理信息弹窗
    showZlglModal = (e) => {
        let { infoClickToProjectName } = this.state
        infoClickToProjectName = e.currentTarget.parentNode.children[0].innerText
        this.setState({
            infoClickToProjectName,
            visibleZlgl: true,
        });
    };

    // 显示经营管理信息弹窗
    showJyglModal = (e) => {
        let { infoClickToProjectName } = this.state
        infoClickToProjectName = e.currentTarget.parentNode.children[0].innerText
        this.setState({
            infoClickToProjectName,
            visibleJygl: true,
        });
    };
    
    handleOk = e => {
        this.setState({
            visibleScgl: false,
            visibleZlgl: false,
            visibleJygl: false,
        });
    };
    
    handleCancel = e => {
        this.setState({
            visibleScgl: false,
            visibleZlgl: false,
            visibleJygl: false,
        });
    };

    render(){
        let { jccyProjectData, jgldProjectData, jcyjProjectData, swjmProjectData, otherProjectData, infoClickToProjectName } = this.state
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
                        // 默认展开显示项
                        // defaultActiveKey={['1']}
                    >
                        <Collapse.Panel header="基础测绘类项目" key="1">
                            <List className='longListStyle' data-value={jccyProjectData.length > 5 ? true : false}
                                split={false}
                                dataSource={jccyProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                        <a
                                            href="http://116.62.138.29:8080/"
                                            className='projectModalButton viewProjectDataButton'
                                            target="_blank"
                                            title='查看项目数据'
                                            rel="noreferrer">
                                                <img src='../../../img/viewProjectDataButton.png'
                                                alt="" />
                                        </a>
                                        {/* <img src='../../../img/viewProjectDataButton.png'
                                            className='projectModalButton viewProjectDataButton'
                                            title='查看项目数据'
                                            onClick={this.alertTest}
                                            alt=""
                                        /> */}
                                        <img src='../../../img/viewProjectScglButton.png'
                                            className='projectModalButton viewProjectScglButton'
                                            title='查看项目生产管理信息'
                                            onClick={this.showScglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectZlglButton.png'
                                            className='projectModalButton viewProjectZlglButton'
                                            title='查看项目质量管理信息'
                                            onClick={this.showZlglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectJyglButton.png'
                                            className='projectModalButton viewProjectJyglButton'
                                            title='查看项目经营管理信息'
                                            onClick={this.showJyglModal}
                                            alt=""
                                        />
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="激光雷达类项目" key="2">
                            <List className='longListStyle' data-value={jgldProjectData.length > 5 ? true : false}
                                split={false}
                                dataSource={jgldProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                        <a
                                            href="http://116.62.138.29:8080/"
                                            className='projectModalButton viewProjectDataButton'
                                            target="_blank"
                                            title='查看项目数据'
                                            rel="noreferrer">
                                                <img src='../../../img/viewProjectDataButton.png'
                                                alt="" />
                                        </a>
                                        <img src='../../../img/viewProjectScglButton.png'
                                            className='projectModalButton viewProjectScglButton'
                                            title='查看项目生产管理信息'
                                            onClick={this.showScglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectZlglButton.png'
                                            className='projectModalButton viewProjectZlglButton'
                                            title='查看项目质量管理信息'
                                            onClick={this.showZlglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectJyglButton.png'
                                            className='projectModalButton viewProjectJyglButton'
                                            title='查看项目经营管理信息'
                                            onClick={this.showJyglModal}
                                            alt=""
                                        />
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="监测预警类项目" key="3">
                            <List className='longListStyle' data-value={jcyjProjectData.length > 5 ? true : false}
                                split={false}
                                dataSource={jcyjProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                        <a
                                            href="http://116.62.138.29:8080/"
                                            className='projectModalButton viewProjectDataButton'
                                            target="_blank"
                                            title='查看项目数据'
                                            rel="noreferrer">
                                                <img src='../../../img/viewProjectDataButton.png'
                                                alt="" />
                                        </a>
                                        <img src='../../../img/viewProjectScglButton.png'
                                            className='projectModalButton viewProjectScglButton'
                                            title='查看项目生产管理信息'
                                            onClick={this.showScglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectZlglButton.png'
                                            className='projectModalButton viewProjectZlglButton'
                                            title='查看项目质量管理信息'
                                            onClick={this.showZlglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectJyglButton.png'
                                            className='projectModalButton viewProjectJyglButton'
                                            title='查看项目经营管理信息'
                                            onClick={this.showJyglModal}
                                            alt=""
                                        />
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="三维建模类项目" key="4">
                            <List className='longListStyle' data-value={swjmProjectData.length > 5 ? true : false}
                                split={false}
                                dataSource={swjmProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                        <a
                                            href="http://116.62.138.29:8080/"
                                            className='projectModalButton viewProjectDataButton'
                                            target="_blank"
                                            title='查看项目数据'
                                            rel="noreferrer">
                                                <img src='../../../img/viewProjectDataButton.png'
                                                alt="" />
                                        </a>
                                        <img src='../../../img/viewProjectScglButton.png'
                                            className='projectModalButton viewProjectScglButton'
                                            title='查看项目生产管理信息'
                                            onClick={this.showScglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectZlglButton.png'
                                            className='projectModalButton viewProjectZlglButton'
                                            title='查看项目质量管理信息'
                                            onClick={this.showZlglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectJyglButton.png'
                                            className='projectModalButton viewProjectJyglButton'
                                            title='查看项目经营管理信息'
                                            onClick={this.showJyglModal}
                                            alt=""
                                        />
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header="其他项目" key="5">
                            <List className='longListStyle' data-value={otherProjectData.length > 5 ? true : false}
                                split={false}
                                dataSource={otherProjectData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text onClick={this.onClickProjectName}>{item}</Typography.Text>
                                        <a
                                            href="http://116.62.138.29:8080/"
                                            className='projectModalButton viewProjectDataButton'
                                            target="_blank"
                                            title='查看项目数据'
                                            rel="noreferrer">
                                                <img src='../../../img/viewProjectDataButton.png'
                                                alt="" />
                                        </a>
                                        <img src='../../../img/viewProjectScglButton.png'
                                            className='projectModalButton viewProjectScglButton'
                                            title='查看项目生产管理信息'
                                            onClick={this.showScglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectZlglButton.png'
                                            className='projectModalButton viewProjectZlglButton'
                                            title='查看项目质量管理信息'
                                            onClick={this.showZlglModal}
                                            alt=""
                                        />
                                        <img src='../../../img/viewProjectJyglButton.png'
                                            className='projectModalButton viewProjectJyglButton'
                                            title='查看项目经营管理信息'
                                            onClick={this.showJyglModal}
                                            alt=""
                                        />
                                    </List.Item>
                                )}
                            />
                        </Collapse.Panel>
                    </Collapse>
                </div>

                <div className="modaltest">
                    <Modal
                        title="生产管理"
                        visible={this.state.visibleScgl}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        centered='true'
                        footer={null}
                        width="1000px"
                        bodyStyle={
                            {
                                height: 700,
                                // backgroundColor: '#ECEFF1'
                            }
                        }
                    >
                        <div>
                            <p>{infoClickToProjectName}</p>
                        </div>
                    </Modal>
                    <Modal
                        title="质量管理"
                        visible={this.state.visibleZlgl}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        centered='true'
                        footer={null}
                        width="1000px"
                        bodyStyle={
                            {
                                height: 700,
                                // backgroundColor: '#ECEFF1'
                            }
                        }
                    >
                        <div>
                            <p>{infoClickToProjectName}</p>
                        </div>
                    </Modal>
                    <Modal
                        title="经营管理"
                        visible={this.state.visibleJygl}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        centered='true'
                        footer={null}
                        width="1000px"
                        bodyStyle={
                            {
                                height: 700,
                                // backgroundColor: '#ECEFF1'
                            }
                        }
                    >
                        <div>
                            <p>{infoClickToProjectName}</p>
                        </div>
                    </Modal>
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
)(ProjectListBoxByType);
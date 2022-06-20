import React, { Component } from 'react'
import { Collapse, List, Typography  } from "antd"
import 'antd/lib/radio/style/css'
import 'antd/lib/collapse/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/typography/style/css'

export default class ProjectListBoxByTime extends Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // 列表展开项点击回调事件
    onClick = (e) => {
        console.log(e.target.innerText)
    }

    render(){
        let text = '测试内容'
        let data = [
            '测试数据1111111111',
            '测试数据2222222222',
            '测试数据3333333333',
            '测试数据4444444444',
            '测试数据5555555555',
        ]
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
                            <Collapse.Panel header="2018" key="1">
                                <List
                                    split={false}
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text onClick={this.onClick}>{item}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Collapse.Panel>
                            <Collapse.Panel header="2019" key="2">
                                <p>{text}</p>
                            </Collapse.Panel>
                            <Collapse.Panel header="2020" key="3">
                                <p>{text}</p>
                            </Collapse.Panel>
                            <Collapse.Panel header="2021" key="4">
                                <p>{text}</p>
                            </Collapse.Panel>
                            <Collapse.Panel header="2022" key="5">
                                <p>{text}</p>
                            </Collapse.Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }

}
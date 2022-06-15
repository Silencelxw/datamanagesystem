import React, {Component} from 'react'
import echarts from 'echarts'
import axios from 'axios'
import { Button } from 'antd'

export default class ProjectDistributionByArea extends Component{

    constructor(props) {
        super(props);
        this.state = {
            areaDataArray: [],
            chartDataArray: [],
            isBar: true
        }
    }

    componentDidMount() {
        const urlProjecctInformation = '../../../data/projectInformation.json'
        let { areaDataArray, chartDataArray } = this.state
        let cdProjectQuantity = 0
        let pxProjectQuantity = 0
        let cxProjectQuantity = 0
        let xzProjectQuantity = 0
        let cqProjectQuantity = 0
        let otherAreaProjectQuantity = 0
        axios.get(urlProjecctInformation)
            .then((response) => {
                const { data: { data } } = response;
                areaDataArray = data.map(item => {return item.area});
                for (let i = 0; i < areaDataArray.length; i++) {
                    switch (areaDataArray[i]) {
                        case '成都':
                            cdProjectQuantity++
                            break;
                        case '攀西':
                            pxProjectQuantity++
                            break;
                        case '川西':
                            cxProjectQuantity++
                            break;
                        case '西藏':
                            xzProjectQuantity++
                            break;
                        case '重庆':
                            cqProjectQuantity++
                            break;
                        default:
                            otherAreaProjectQuantity++
                            break;
                    }
                }
                chartDataArray.push(cdProjectQuantity, pxProjectQuantity, cxProjectQuantity, xzProjectQuantity, cqProjectQuantity, otherAreaProjectQuantity)
                this.setState({
                    chartDataArray
                });
                this.drawChartByBar();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    drawChartByBar = () => {
        let { chartDataArray } = this.state
        this.setState({
            isBar: true
        });
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('projectDistributionByArea-chart'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: ['成都', '攀西', '川西', '西藏', '重庆', '其他'],
                axisLabel:{
                    align: 'left',
                    padding: [15, 0, 0, -12],
                    interval: 0
                }
            },
            series: [
                {
                    name: '项目数量',
                    type: 'bar',
                    itemStyle: {
                        color: function (params) {
                            const colorList = [
                                '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#ca8622', '#bda29a'
                            ];
                            return colorList[params.dataIndex]
                        }
                    },
                    data: chartDataArray
                }
            ]
        });
    }

    drawChartByLine = () => {
        let { chartDataArray } = this.state
        this.setState({
            isBar: false
        });
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('projectDistributionByArea-chart'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: ['成都', '攀西', '川西', '西藏', '重庆', '其他'],
                axisLabel:{
                    align: 'left',
                    padding: [15, 0, 0, -12],
                    interval: 0
                }
            },
            series: [
                {
                    name: '项目数量',
                    type: 'line',
                    areaStyle: {
                        color: '#ff0',
                        opacity: 0.5
                    },
                    data: chartDataArray
                }
            ]
        });
    }

    switchChange = () => {
        let { isBar } = this.state;
        if (isBar) {
            this.drawChartByLine();
        } else {
            this.drawChartByBar();
        }
    }

    render(){
        let { isBar } = this.state;
        var msg = isBar ? '切换折线图' : '切换柱状图';
        return(
            <div>
                <div id='projectDistributionByArea' className='projectDistributionByArea'>
                    <div className='projectDistributionByArea-title'>
                        <span>项目区域分布</span>
                    </div>
                    <Button className="projectDistributionByArea-switch" onClick={this.switchChange} type="primary" ghost>{msg}</Button>
                    <div id='projectDistributionByArea-chart' className='projectDistributionByArea-chart'></div>
                    <div className="dividingLine"></div>
                </div>
            </div>
        )
    }
}
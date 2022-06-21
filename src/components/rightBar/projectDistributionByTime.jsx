import React, {Component} from 'react'
import echarts from 'echarts'
import axios from 'axios'

export default class ProjectDistributionByTime extends Component{

    constructor(props) {
        super(props);
        this.state = {
            typeDataArray: [],
            timeDataArray: [],
            type_timeDataArray: [],
            jcchProjectQuantityArray: [],
            jgldProjectQuantityArray: [],
            jcyjProjectQuantityArray: [],
            swjmProjectQuantityArray: [],
            otherProjectQuantityArray: []
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { typeDataArray, timeDataArray, type_timeDataArray, jcchProjectQuantityArray, jgldProjectQuantityArray, jcyjProjectQuantityArray, swjmProjectQuantityArray, otherProjectQuantityArray } = this.state
        let jcchProject2018Quantity = 0
        let jcchProject2019Quantity = 0
        let jcchProject2020Quantity = 0
        let jcchProject2021Quantity = 0
        let jcchProject2022Quantity = 0
        let jgldProject2018Quantity = 0
        let jgldProject2019Quantity = 0
        let jgldProject2020Quantity = 0
        let jgldProject2021Quantity = 0
        let jgldProject2022Quantity = 0
        let jcyjProject2018Quantity = 0
        let jcyjProject2019Quantity = 0
        let jcyjProject2020Quantity = 0
        let jcyjProject2021Quantity = 0
        let jcyjProject2022Quantity = 0
        let swjmProject2018Quantity = 0
        let swjmProject2019Quantity = 0
        let swjmProject2020Quantity = 0
        let swjmProject2021Quantity = 0
        let swjmProject2022Quantity = 0
        let otherProject2018Quantity = 0
        let otherProject2019Quantity = 0
        let otherProject2020Quantity = 0
        let otherProject2021Quantity = 0
        let otherProject2022Quantity = 0
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                typeDataArray = data.map(item => {return item.type});
                timeDataArray = data.map(item => {return item.time});
                for (let i = 0; i < typeDataArray.length; i++) {
                    type_timeDataArray[i] = {
                        type: typeDataArray[i],
                        time: timeDataArray[i]
                    }
                }
                for (let j = 0; j < type_timeDataArray.length; j++) {
                    if (typeDataArray[j] === '基础测绘') {
                        switch (timeDataArray[j]) {
                            case 2018:
                                jcchProject2018Quantity++
                                break;
                            case 2019:
                                jcchProject2019Quantity++
                                break;
                            case 2020:
                                jcchProject2020Quantity++
                                break;
                            case 2021:
                                jcchProject2021Quantity++
                                break;
                            case 2022:
                                jcchProject2022Quantity++
                                break;
                            default:
                                break;
                        }
                    }
                    else if (typeDataArray[j] === '激光雷达') {
                        switch (timeDataArray[j]) {
                            case 2018:
                                jgldProject2018Quantity++
                                break;
                            case 2019:
                                jgldProject2019Quantity++
                                break;
                            case 2020:
                                jgldProject2020Quantity++
                                break;
                            case 2021:
                                jgldProject2021Quantity++
                                break;
                            case 2022:
                                jgldProject2022Quantity++
                                break;
                            default:
                                break;
                        }
                    }
                    else if (typeDataArray[j] === '监测预警') {
                        switch (timeDataArray[j]) {
                            case 2018:
                                jcyjProject2018Quantity++
                                break;
                            case 2019:
                                jcyjProject2019Quantity++
                                break;
                            case 2020:
                                jcyjProject2020Quantity++
                                break;
                            case 2021:
                                jcyjProject2021Quantity++
                                break;
                            case 2022:
                                jcyjProject2022Quantity++
                                break;
                            default:
                                break;
                        }
                    }
                    else if (typeDataArray[j] === '三维建模') {
                        switch (timeDataArray[j]) {
                            case 2018:
                                swjmProject2018Quantity++
                                break;
                            case 2019:
                                swjmProject2019Quantity++
                                break;
                            case 2020:
                                swjmProject2020Quantity++
                                break;
                            case 2021:
                                swjmProject2021Quantity++
                                break;
                            case 2022:
                                swjmProject2022Quantity++
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        switch (timeDataArray[j]) {
                            case 2018:
                                otherProject2018Quantity++
                                break;
                            case 2019:
                                otherProject2019Quantity++
                                break;
                            case 2020:
                                otherProject2020Quantity++
                                break;
                            case 2021:
                                otherProject2021Quantity++
                                break;
                            case 2022:
                                otherProject2022Quantity++
                                break;
                            default:
                                break;
                        }
                    }
                }
                jcchProjectQuantityArray.push(jcchProject2018Quantity, jcchProject2019Quantity, jcchProject2020Quantity, jcchProject2021Quantity, jcchProject2022Quantity)
                jgldProjectQuantityArray.push(jgldProject2018Quantity, jgldProject2019Quantity, jgldProject2020Quantity, jgldProject2021Quantity, jgldProject2022Quantity)
                jcyjProjectQuantityArray.push(jcyjProject2018Quantity, jcyjProject2019Quantity, jcyjProject2020Quantity, jcyjProject2021Quantity, jcyjProject2022Quantity)
                swjmProjectQuantityArray.push(swjmProject2018Quantity, swjmProject2019Quantity, swjmProject2020Quantity, swjmProject2021Quantity, swjmProject2022Quantity)
                otherProjectQuantityArray.push(otherProject2018Quantity, otherProject2019Quantity, otherProject2020Quantity, otherProject2021Quantity, otherProject2022Quantity)
                this.setState({
                    jcchProjectQuantityArray,
                    jgldProjectQuantityArray,
                    jcyjProjectQuantityArray,
                    swjmProjectQuantityArray,
                    otherProjectQuantityArray
                });
                this.drawChart();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    drawChart = () => {
        let { jcchProjectQuantityArray, jgldProjectQuantityArray, jcyjProjectQuantityArray, swjmProjectQuantityArray, otherProjectQuantityArray } = this.state
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('projectDistributionByTime-chart'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                top: 20,
                data: ['基础测绘', '激光雷达', '监测预警', '三维建模', '其他']
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: ['2018', '2019', '2020', '2021', '2022'],
                axisLabel:{
                    align: 'left',
                    padding: [15, 0, 0, -12],
                    interval: 0
                }
            },
            series: [
                {
                    name: '基础测绘',
                    type: 'line',
                    data: jcchProjectQuantityArray
                },
                {
                    name: '激光雷达',
                    type: 'line',
                    data: jgldProjectQuantityArray
                },
                {
                    name: '监测预警',
                    type: 'line',
                    data: jcyjProjectQuantityArray
                },
                {
                    name: '三维建模',
                    type: 'line',
                    data: swjmProjectQuantityArray
                },
                {
                    name: '其他',
                    type: 'line',
                    data: otherProjectQuantityArray
                },
            ]
        });
    }

    render(){
        return(
            <div>
                <div id='projectDistributionByTime' className='projectDistributionByTime'>
                    <div className='projectDistributionByTime-title'>
                        <span>近年项目数量情况</span>
                    </div>
                    <div id='projectDistributionByTime-chart' className='projectDistributionByTime-chart'></div>
                </div>
            </div>
        )
    }
}
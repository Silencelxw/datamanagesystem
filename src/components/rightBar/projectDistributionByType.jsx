import React, {Component} from 'react'
import echarts from 'echarts'
import axios from 'axios'

export default class ProjectDistributionByType extends Component{

    constructor(props) {
        super(props);
        this.state = {
            typeDataArray: [],
            jcchQuantity: 0,
            jgldQuantity: 0,
            jcyjQuantity: 0,
            swjmQuantity: 0,
            otherQuantity: 0
        }
    }

    componentDidMount() {
        const urlProjectInformation = '../../../data/projectInformation.json'
        let { typeDataArray, jcchQuantity, jgldQuantity, jcyjQuantity, swjmQuantity, otherQuantity } = this.state
        axios.get(urlProjectInformation)
            .then((response) => {
                const { data: { data } } = response;
                typeDataArray = data.map(item => {return item.type});
                for (let i = 0; i < typeDataArray.length; i++) {
                    switch (typeDataArray[i]) {
                        case '基础测绘':
                            jcchQuantity++
                            break;
                        case '激光雷达':
                            jgldQuantity++
                            break;
                        case '监测预警':
                            jcyjQuantity++
                            break;
                        case '三维建模':
                            swjmQuantity++
                            break;
                        default:
                            otherQuantity++
                            break;
                    }
                }
                this.setState({
                    jcchQuantity,
                    jgldQuantity,
                    jcyjQuantity,
                    swjmQuantity,
                    otherQuantity
                });
                this.drawChart();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    drawChart = () => {
        let { jcchQuantity, jgldQuantity, jcyjQuantity, swjmQuantity, otherQuantity } = this.state
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('projectDistributionByType-chart'));
        // 绘制图表
        myChart.setOption({
            legend: {
                right: '5%',
                orient: 'vertical',
                data: ['基础测绘', '激光雷达', '监测预警', '三维建模', '其他']
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}:{c}',
            },
            series: [
                {
                    name: '项目类型分布',
                    type: 'pie',
                    clockwise: true,
                    label: {
                        show: true,
                    },
                    center: ['40%', '50%'],
                    data: [
                        {value: jcchQuantity, name: '基础测绘'},
                        {value: jgldQuantity, name: '激光雷达'},
                        {value: jcyjQuantity, name: '监测预警'},
                        {value: swjmQuantity, name: '三维建模'},
                        {value: otherQuantity, name: '其他'}
                    ]
                }
            ]
        });
    }

    render(){
        return(
            <div>
                <div id='projectDistributionByType' className='projectDistributionByType'>
                    <div className='projectDistributionByType-title'>
                        <span>项目类型分布</span>
                    </div>
                    <div id='projectDistributionByType-chart' className='projectDistributionByType-chart'></div>
                    <div className="dividingLine"></div>
                </div>
            </div>
        )
    }
}
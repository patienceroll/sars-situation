import React from 'react';

import style from './VariationTrend.module.css';

// ant 组件
import { Icon, Row, Col, Card } from 'antd';
// echarts
import echarts from 'echarts';
// 导入 echarts 实例的配置
import { trendOptins, increaseTrendOptins } from '../../echartsOptions/optins.js';

class Header extends React.Component {
    render() {
        return <div className={style.header}>
            <div className={style.title}>
                <Icon type="rise" style={{ fontSize: '60px' }} />
                <span style={{ marginLeft: '9px', }}>趋势</span>
                <Icon type="clock-circle" style={{ fontSize: '22.5px', marginLeft: '30%' }} />
                <span style={{ fontSize: '22.5px', lineHeight: '22.5px', marginLeft: '7.5px' }}>数据来源于腾讯新闻</span>
                <span style={{ margin: '0 7.5px', fontSize: 22.5 }}>{window.infectData.lastUpdateTime}</span>
                <Icon type="sync" spin={true} style={{ fontSize: '22.5px' }} />
            </div>
        </div>
    }
}

class Trend extends React.Component {

    state = {
        chinaDayList: [],
        chinaDayAddList: [],
    }

    refreshState() {
        const { chinaDayList, chinaDayAddList } = window.infectData;
        this.setState({
            chinaDayList: chinaDayList,
            chinaDayAddList: chinaDayAddList
        })
    }

    initEcharts() {
        const { chinaDayList, chinaDayAddList } = this.state;

        // 绘制每日新增病例图
        var dayList = [], dayConfirmList = [], daySuspectList = [];
        const dayIncreaseGraph = echarts.init(document.getElementById('dayIncreaseGraph'));
        // 遍历数据生成配置数据
        chinaDayAddList.map(item => {
            dayList.push(item.date);
            dayConfirmList.push(item.confirm);
            daySuspectList.push(item.suspect);
            return null;
        });
        // 生成图例实例
        dayIncreaseGraph.setOption(increaseTrendOptins(dayList, dayConfirmList, daySuspectList));

        
        // 绘制总数量变化图
        var increaseDayList = [], confirmList = [], suspectList = [], healedList = [], deadList = [];
        const increaseGraph = echarts.init(document.getElementById('IncreaseGraph'));

        chinaDayList.map(item => {
            increaseDayList.push(item.date);
            confirmList.push(item.confirm);
            suspectList.push(item.suspect);
            healedList.push(item.heal);
            deadList.push(item.dead);
            return null;
        })
        // 生成图例实例
        increaseGraph.setOption(trendOptins(increaseDayList, confirmList, suspectList, healedList, deadList));
    }

    async componentDidMount() {
        await this.refreshState();
        await this.initEcharts();
    }

    render() {
        return <Row className={style.trendContainer} style={{ height: window.innerHeight - 131.25 }}>

            {/* 疫情新增趋势盒子 */}
            <Col span={12} className={style.increaseTrend}>
                <Card
                    title="日增数量 (人/每日)"
                    headStyle={{ color: '#fff', backgroundColor: '#0099CC', fontSize: '18.75px', height: '52.5px', width: '100%' }}
                    bodyStyle={{ padding: 11.25, height: '100%' }}
                    style={{ width: '100%', height: '95%', boxShadow: '4px 4px 5px #888888', overflow: 'hidden' }}
                >
                    <div id="dayIncreaseGraph" style={{ height: '85%' }}></div>
                </Card>
            </Col>

            {/* 累计确诊以及死亡趋势盒子 */}
            <Col span={12} className={style.comfirmTrend}>
                <Card
                    title="总数量 (人/每日)"
                    headStyle={{ color: '#fff', backgroundColor: '#0099CC', fontSize: '25px', height: '70px', width: '100%' }}
                    bodyStyle={{ padding: 15, height: '100%' }}
                    style={{ width: '100%', height: '95%', boxShadow: '4px 4px 5px #888888', overflow: 'hidden' }}
                >
                    <div id="IncreaseGraph" style={{ height: '85%' }}></div>
                </Card>
            </Col>
        </Row>
    }
}

class VariationTrend extends React.Component {

    render() {
        return <>
            <div className={style.div} >
                <Header></Header>
                <Trend></Trend>
            </div>
        </>
    }
}

export default VariationTrend;
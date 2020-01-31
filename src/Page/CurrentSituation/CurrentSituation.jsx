import React from 'react';

import style from './CurrentSituation.module.css';
import './CurrentSituation.css';

// ant 组件
import { Row, Col } from 'antd';


class TotalData extends React.Component {
    render() {
        const { chinaTotal: { confirm, suspect, dead, heal } } = this.props;
        return <div>
            <Row className='totalDataRow'>
                <Col span={6} >
                    <span style={{ color: 'rgb(216,29,27)' }}>{confirm}</span>
                    <p>全国确诊</p>
                </Col>
                <Col span={6}>
                    <span style={{ color: 'rgb(247,171,26)' }}>{suspect}</span>
                    <p>疑似病例</p>
                </Col>
                <Col span={6}>
                    <span style={{ color: 'rgb(23,139,80)' }}>{heal}</span>
                    <p>治愈人数</p>
                </Col>
                <Col span={6}>
                    <span style={{ color: 'rgb(102,102,108)' }}>{dead}</span>
                    <p>死亡人数</p>
                </Col>
            </Row>
        </div>
    }
}

class MapSituation extends React.Component {

    state = {
        chinaAreaTree: [],
        infectMap: {},
        //省份坐标(避免地址解析直接给出，顺序与chinaAreaTree中中国地区省份顺序一致)
        provinceCoord: [
            { "lng": 111.14588269007913, "lat": 33.13290326055209 },
            { "lng": 121.14878143025066, "lat": 30.188062675913905 },
            { "lng": 113.99743053873469, "lat": 22.53581126769833 },
            { "lng": 101.62247338027404, "lat": 34.740396071091155 },
            { "lng": 113.00278697331211, "lat": 28.186192975476388 },
            { "lng": 115.91542320365122, "lat": 28.68169051676075 },
            { "lng": 117.35541692271576, "lat": 32.96651320701659 },
            { "lng": 120.31068763182607, "lat": 35.99530630404869 },
            { "lng": 108.3799135180364, "lat": 30.814967604192656 },
            { "lng": 103.93717563531006, "lat": 30.608293840569402 },
            { "lng": 118.92040902964006, "lat": 32.084060015522816 },
            { "lng": 116.51288495608856, "lat": 39.84746927558593 },
            { "lng": 121.48680103771713, "lat": 31.24257042542815 },
            { "lng": 119.35038995226057, "lat": 26.058660737766438 },
            { "lng": 108.66358796476031, "lat": 21.943465001920465 },
            { "lng": 108.96039314875111, "lat": 34.27580800602361 },
            { "lng": 102.47404642159835, "lat": 24.917734785759006 },
            { "lng": 117.20359278135501, "lat": 39.15348514470478 },
            { "lng": 126.60465403880194, "lat": 45.76771786534516 },
            { "lng": 100.62662114445924, "lat": 36.2921024798988 },
            { "lng": 123.43559785683209, "lat": 41.84146525120185 },
            { "lng": 111.0096707391596, "lat": 38.976285468146884 },
            { "lng": 117.32805624366229, "lat": 39.17126680178836 },
            { "lng": 106.67307599435273, "lat": 26.702860015324976 },
            { "lng": 103.84210203437273, "lat": 36.060173609307874 },
            { "lng": 106.17116945214102, "lat": 38.464453346515356 },
            { "lng": 111.77260583081977, "lat": 40.823156232446166 },
            { "lng": 87.63347320573824, "lat": 43.79923810128996 },
            { "lng": 125.33257987514821, "lat": 43.90171443544392 },
            { "lng": 120.97895033904341, "lat": 23.75701796393315 },
            { "lng": 101.78646183586761, "lat": 36.62715857923451 },
            { "lng": 114.0688464555682, "lat": 22.53615142365805 },
            { "lng": 91.12434212899261, "lat": 29.652893647472517 }
        ]
    }

    initInfectMap() {
        const { BMap } = window;
        var { infectMap} = this.state;
        infectMap = new BMap.Map('infectMap');
        var point = new BMap.Point(106.558, 29.568);
        infectMap.centerAndZoom(point, 7);
        infectMap.addControl(new BMap.NavigationControl());
    }


    addProvinceLayer() {
        const { BMap } = window;
        setTimeout(() => {
            this.state.chinaAreaTree.map(item => {
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上，并调整地图视野    
                myGeo.getPoint(item.name, function (point) {
                    if (point) {
                        a.push(point);
                        item.name === '西藏' && console.log(JSON.stringify(a));
                    }
                }, item.name);
            });
        }, 100);
    }

    refreshState() {
        const { infectData } = window;
        this.setState({
            chinaAreaTree: infectData.areaTree[0].children
        })
    }

    componentDidMount() {
        this.refreshState();
        this.initInfectMap();
        this.addProvinceLayer();
    }

    render() {
        return <div id='infectMap' style={{ height: window.innerHeight - 330 }}>

        </div>
    }
}

class CurrentSituation extends React.Component {
    state = {
        chinaTotal: {
            date: "01.31",
            confirm: "9745",
            suspect: "15238",
            dead: "213",
            heal: "177"
        },
        lastUpdateTime: '2020-01-31 15:44:46'
    }
    t
    refreshState() {
        const { infectData } = window;
        this.setState({
            chinaTotal: infectData.chinaTotal,
            lastUpdateTime: infectData.lastUpdateTime,

        })
    }


    componentDidMount() {
        this.refreshState();
    }

    render() {
        return <div className={style.container} >
            {/* 标题 */}
            <div className={style.header}>
                <div className={style.title1}>新型冠状肺炎</div>
                <div className={style.title2}>疫情实时追踪</div>
            </div>

            {/* 实时总览 */}
            <TotalData chinaTotal={this.state.chinaTotal}></TotalData>

            {/* 地图疫情 */}
            <MapSituation></MapSituation>
        </div>
    }
}

export default CurrentSituation;
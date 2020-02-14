import React from 'react';

import style from './CurrentSituation.module.css';
import './CurrentSituation.css';

// ant 组件
import { Row, Col, Button, Icon } from 'antd';

// 引用 window 对象里的百度地图
const { BMap } = window;

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
        displayBackBtn: false,
        provinceCorrd: {
            '新疆': { lng: 87.63347320573824, lat: 43.79923810128996 },
            '西藏': { lng: 91.12082391546393, lat: 29.65004027476773 },
            '黑龙江': { lng: 126.66965282041836, lat: 45.74792983743469 },
            '吉林': { lng: 125.33107197951917, lat: 43.89257578056888 },
            '辽宁': { lng: 123.43559785683209, lat: 41.84146525120185 },
            '内蒙古': { lng: 111.67741976203259, lat: 40.82403376116102 },
            '北京': { lng: 116.4133836971231, lat: 39.910924547299565 },
            '宁夏': { lng: 106.26560480701352, lat: 38.47687796791088 },
            '山西': { lng: 112.56937550968271, lat: 37.87982942385603 },
            '河北': { lng: 114.53659630531568, lat: 38.04320164520046 },
            '天津': { lng: 117.2095232146708, lat: 39.093667843403956 },
            '青海': { lng: 101.78537335908116, lat: 36.62935165833543 },
            '甘肃': { lng: 103.83247812812213, lat: 36.06546488736762 },
            '山东': { lng: 117.02744162847857, lat: 36.674856650404905 },
            '陕西': { lng: 108.96039314875111, lat: 34.27580800602361 },
            '河南': { lng: 113.75938408486323, lat: 34.771712921931496 },
            '安徽': { lng: 117.3305404177196, lat: 31.73429415631746 },
            '江苏': { lng: 118.76955164466914, lat: 32.066776944293416 },
            '上海': { lng: 121.48053886017651, lat: 31.235929042252014 },
            '四川': { lng: 104.07346654728391, lat: 30.577543147015334 },
            '湖北': { lng: 114.34844073658718, lat: 30.551600064658352 },
            '浙江': { lng: 120.15953308739246, lat: 30.271548393336545 },
            '重庆': { lng: 106.55843415537664, lat: 29.568996245338923 },
            '湖南': { lng: 112.98960254334654, lat: 28.118269998009367 },
            '江西': { lng: 115.91542320365122, lat: 28.68169051676075 },
            '贵州': { lng: 106.71447593088575, lat: 26.604029544994923 },
            '福建': { lng: 119.30244747703945, lat: 26.106339415901047 },
            '云南': { lng: 102.71641607523223, lat: 25.051562267344867 },
            '台湾': { lng: 120.97895033904341, lat: 23.75701796393315 },
            '广西': { lng: 108.3345212294372, lat: 22.821268997908664 },
            '广东': { lng: 113.27242891272826, lat: 23.13794855653905 },
            '海南': { lng: 110.35553651088428, lat: 20.025801964462914 },
            '澳门': { lng: 113.566432335, lat: 22.1950041592 },
            '香港': { lng: 114.146701965, lat: 22.4274312754 }
        }

    }

    initInfectMap() {
        let infectMap = new BMap.Map('infectMap');
        this.infectMap = infectMap;
        var point = new BMap.Point(106.558, 29.568);
        infectMap.centerAndZoom(point, 7);
        infectMap.addControl(new BMap.NavigationControl());
    }


    addProvinceLayer() {
        const { infectMap, createOverLayer } = this;
        const { chinaAreaTree, provinceCorrd } = this.state;
        chinaAreaTree.map((item, index) => {
            let point = {};
            point.lng = provinceCorrd[item.name].lng;
            point.lat = provinceCorrd[item.name].lat;
            createOverLayer(chinaAreaTree, point, index, 11, infectMap);
            return null;
        })
    }

    addCityLayer(provinceIndex) {
        const { chinaAreaTree } = this.state;
        const province = chinaAreaTree[provinceIndex];
        const { infectMap, createOverLayer } = this;

        this.setState({
            displayBackBtn: true
        })

        province.children.map((item, index) => {
            var myGeo = new BMap.Geocoder();
            item.name !== '地区待确认' && myGeo.getPoint(item.name, (point) => {
                if (point) {
                    createOverLayer(province.children, point, index, undefined, infectMap);
                }
            }, province);
            return null;
        });
    }

    createOverLayer(data, point, index, zoom, mapObject) {
        const label = new BMap.Label('', { position: point });
        const infectMap = mapObject;
        label.setContent(`<div>确诊</div><span>${data[index].total.confirm}例</span>`);
        label.setStyle({
            color: "#FF0033",
            fontSize: "35px",
            height: "100px",
            width: '100px',
            lineHeight: "45px",
            fontFamily: "微软雅黑",
            borderRadius: '0 50% 50% 50%',
            backgroundColor: '#FF9966',
            border: '0',
            textAlign: 'center'
        });
        label.addEventListener('click', (e) => {
            infectMap.centerAndZoom(new BMap.Point(point.lng, point.lat), zoom);
            infectMap.clearOverlays();
            zoom === 11 && window.addCityLayer(index);
        });
        infectMap.addOverlay(label);
    }

    refreshState() {
        const { infectData } = window;
        try {
            this.setState({
                chinaAreaTree: infectData.areaTree[0].children
            })
        } catch (e) {
            alert(e);
        }

    }

    async componentDidMount() {
        await this.refreshState();
        await this.initInfectMap();
        await this.addProvinceLayer();
        // 百度地图覆盖物添加事件会导致this丢失 
        window.addCityLayer = this.addCityLayer.bind(this);
    }

    render() {
        return <>
            <div id='infectMap' style={{ height: window.innerHeight - 247.5 }}></div>
            {this.props.scrollerParam === 0 && this.state.displayBackBtn &&
                <Button
                    className={style.rebackBtn}
                    type="primary"
                    size='large'
                    onClick={() => {
                        this.infectMap.clearOverlays();
                        this.addProvinceLayer();
                        var point = new BMap.Point(106.558, 29.568);
                        this.infectMap.centerAndZoom(point, 7);
                        this.setState({
                            displayBackBtn: false
                        })
                    }}
                >
                    返回省级
                <Icon type="rollback" /></Button>
            }

        </>
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
                <div className={style.time}>
                    <Icon type="clock-circle" />
                    <span style={{ margin: '0 10px' }}>统计截止:</span>
                    <span style={{ margin: '0 10px' }}>{this.state.lastUpdateTime}</span>
                    <Icon type="sync" spin={true} />
                </div>
            </div>

            {/* 实时总览 */}
            <TotalData chinaTotal={this.state.chinaTotal}></TotalData>

            {/* 地图疫情 */}
            <MapSituation scrollerParam={this.props.scrollerParam}></MapSituation>
        </div>
    }
}

export default CurrentSituation;
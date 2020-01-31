import React from 'react';

import style from './CurrentSituation.module.css';
import './CurrentSituation.css';

// ant 组件
import { Row, Col } from 'antd';

// 引用 window 对象里的百度地图
const { BMap } = window;
console.log(window.infectData);

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
        //省份坐标(避免地址解析直接给出，顺序与chinaAreaTree中中国地区省份顺序一致)
        provinceCoord: [{"lng":114.34844073658718,"lat":30.551600064658352},{"lng":120.15953308739246,"lat":30.271548393336545},{"lng":113.27242891272826,"lat":23.13794855653905},{"lng":112.98960254334654,"lat":28.118269998009367},{"lng":113.75938408486323,"lat":34.771712921931496},{"lng":115.91542320365122,"lat":28.68169051676075},{"lng":117.3305404177196,"lat":31.73429415631746},{"lng":117.02744162847857,"lat":36.674856650404905},{"lng":106.55843415537664,"lat":29.568996245338923},{"lng":104.07346654728391,"lat":30.577543147015334},{"lng":118.76955164466914,"lat":32.066776944293416},{"lng":116.4133836971231,"lat":39.910924547299565},{"lng":119.30244747703945,"lat":26.106339415901047},{"lng":121.48053886017651,"lat":31.235929042252014},{"lng":102.71641607523223,"lat":25.051562267344867},{"lng":108.3345212294372,"lat":22.821268997908664},{"lng":114.53659630531568,"lat":38.04320164520046},{"lng":108.96039314875111,"lat":34.27580800602361},{"lng":126.66965282041836,"lat":45.74792983743469},{"lng":110.35553651088428,"lat":20.025801964462914},{"lng":112.56937550968271,"lat":37.87982942385603},{"lng":123.43559785683209,"lat":41.84146525120185},{"lng":117.2095232146708,"lat":39.093667843403956},{"lng":103.83247812812213,"lat":36.06546488736762},{"lng":106.71447593088575,"lat":26.604029544994923},{"lng":106.26560480701352,"lat":38.47687796791088},{"lng":111.77260583081977,"lat":40.823156232446166},{"lng":87.63347320573824,"lat":43.79923810128996},{"lng":125.33107197951917,"lat":43.89257578056888},{"lng":120.97895033904341,"lat":23.75701796393315},{"lng":101.78537335908116,"lat":36.62935165833543},{"lng":91.12434212899261,"lat":29.652893647472517}]
    }

    initInfectMap() {
        let infectMap = new BMap.Map('infectMap');
        this.infectMap = infectMap;
        var point = new BMap.Point(106.558, 29.568);
        infectMap.centerAndZoom(point, 7);
        infectMap.addControl(new BMap.NavigationControl());
    }


    addProvinceLayer() {
        const { provinceCoord } = this.state;
        provinceCoord.map((point,index)=>this.createOverLayer(point,index))
    }

    createOverLayer(point,index) {
        const provinceInfect = window.infectData.areaTree[0].children;
        console.log(provinceInfect);
        const label = new BMap.Label(JSON.stringify(point), { position: point });
        label.setContent(`<div>确诊</div><span>${provinceInfect[index].total.confirm}例</span>`);
        label.setStyle({
            color : "#FF0033",
            fontSize : "35px",
            height : "100px",
            width:'100px',
            lineHeight : "45px",
            fontFamily:"微软雅黑",
            borderRadius:'0 50% 50% 50%',
            backgroundColor:'#FF9966',
            border:'0',
            textAlign:'center'
            });
        this.infectMap.addOverlay(label);
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
        return <div id='infectMap' style={{ height: window.innerHeight - 330 }}></div>
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
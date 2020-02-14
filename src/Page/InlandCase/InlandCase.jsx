import React from 'react';

import style from './InlandCase.module.css';
import './InlandCase.css'

// ant design 组件
import { Row, Col, Card, Icon, List, Collapse } from 'antd';
const { Panel } = Collapse;

class Header extends React.Component {
    render() {
        return <div className={style.header}>
            <div className={style.title}>
                <Icon type="container" style={{ fontSize: '60px' }} />
                <span style={{ marginLeft: '9px', }}>病例</span>
                <Icon type="clock-circle" style={{ fontSize: '22.5px', marginLeft: '30%' }} />
                <span style={{ fontSize: '22.5px', lineHeight: '22.5px', marginLeft: '7.5px' }}>数据来源于腾讯新闻</span>
                <span style={{ margin: '0 7.5px', fontSize: 22.5 }}>{window.infectData.lastUpdateTime}</span>
                <Icon type="sync" spin={true} style={{ fontSize: '22.5px' }} />
            </div>

        </div>
    }
}

// 病例列表组件,包括国内，国外两个列表
class InfectList extends React.Component {
    state = {
        // 全球疫情数据
        areaTree: [],
        // 国内疫情数据
        inlandTree: [],
    }

    refreshState() {
        this.setState({
            areaTree: window.infectData.areaTree,
            inlandTree: window.infectData.areaTree[0].children
        })
    }

    async componentDidMount() {
        await this.refreshState();
    }

    render() {
        const { pageScrollStateChange } = this.props;
        return <>
            <Row className={style.infectListContainer} style={{ height: window.innerHeight - 131.25 }}>

                {/* 国内病例列表 */}
                <Col span={16} className={style.leftContainer} >
                    <Card title={<span><Icon type="idcard" /> 国内病例</span>}
                        bordered={false}
                        style={{ width: '100%', height: '100%', boxShadow: '4px 4px 5px #888888', overflow: 'hidden' }}
                        headStyle={{ color: '#fff', backgroundColor: '#0099CC', fontSize: '18.75px', height: '52.5px' }}
                        bodyStyle={{ height: window.innerHeight - 201.75 ,paddingBottom:35}}
                    >
                        <Row style={{ textAlign: 'center', padding: '0 36.75px 0 18px', fontWeight: 'bold', fontSize: 18.75 }}>
                            <Col span={4}>地区</Col>
                            <Col span={8}>新增确诊</Col>
                            <Col span={4}>累计确诊</Col>
                            < Col span={4}>治愈</Col>
                            <Col span={4}>死亡</Col>
                        </Row>
                        <div className={style.listContainer1}>
                            {/* 长列表懒加载 */}
                            {/* 省级列表 */}
                            <List
                                onMouseEnter={() => { pageScrollStateChange(false) }}
                                onMouseLeave={() => { pageScrollStateChange(true) }}
                                className='InlandList'
                                bordered
                                dataSource={this.state.inlandTree}
                                renderItem={(item, index) => (

                                    <List.Item style={{ padding: 0 }}>
                                        <Collapse
                                            defaultActiveKey={['0']}
                                            onChange={() => { }}
                                            style={{ width: '100%' }}
                                            expandIconPosition='right'
                                            bordered={false}
                                        >
                                            <Panel
                                                header={
                                                    <div className={style.inlandList}>
                                                        <div className={style.listItem1}>{item.name}</div>
                                                        <div className={style.listItem2}>{item.today.confirm}</div>
                                                        <div className={style.listItem1}>{item.total.confirm}</div>
                                                        <div className={style.listItem1}>{item.total.heal}</div>
                                                        <div className={style.listItem1}>{item.total.dead}</div>
                                                    </div>
                                                }
                                                style={{ width: '100%' }}
                                                key={index}

                                            >

                                                {/* 渲染省份中的城市病例数量 */}
                                                <List
                                                    dataSource={item.children}
                                                    renderItem={itemSon => <List.Item>
                                                        <div className={style.inlandList}>
                                                            <div className={style.listItem1}>{itemSon.name}</div>
                                                            <div className={style.listItem2}>{itemSon.today.confirm}</div>
                                                            <div className={style.listItem1}>{itemSon.total.confirm}</div>
                                                            <div className={style.listItem1}>{itemSon.total.heal}</div>
                                                            <div className={style.listItem1}>{itemSon.total.dead}</div>
                                                        </div>
                                                    </List.Item>}
                                                />
                                            </Panel>
                                        </Collapse>
                                    </List.Item>
                                )}
                            />

                        </div>
                    </Card>
                </Col>

                {/* 国外病例列表 */}
                <Col span={8} className={style.rightContainer}>
                    <Card title={<span><Icon type="idcard" /> 国际病例</span>}
                        bordered={false}
                        style={{ width: '100%', height: '100%', boxShadow: '4px 4px 5px #888888', overflow: 'hidden' }}
                        headStyle={{ color: '#fff', backgroundColor: '#0099CC', fontSize: '18.75px', height: '52.5px' }}
                        bodyStyle={{ height: window.innerHeight - 201.75,paddingBottom:35 }}
                    >
                        <Row style={{ textAlign: 'center', padding: '0 36.75px 0 18px', fontWeight: 'bold', fontSize: 18.75 }}>
                            <Col span={6}>地区</Col>
                            <Col span={12}>新增确诊</Col>
                            <Col span={6}>累计确诊</Col>
                        </Row>
                        <div className={style.listContainer1}>
                            {/* 市级列表 */}
                            <List
                                onMouseEnter={() => { pageScrollStateChange(false) }}
                                onMouseLeave={() => { pageScrollStateChange(true) }}
                                style={{ position: 'relative', height: '100%', overflow: 'scroll' }}
                                bordered
                                dataSource={this.state.areaTree}
                                renderItem={item => (
                                    <List.Item>
                                        <div className={style.inlandList}>
                                            <div className={style.listItem1}>{item.name}</div>
                                            <div className={style.listItem2}>{item.today.confirm}</div>
                                            <div className={style.listItem1}>{item.total.confirm}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />

                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    }
}


class InlandCase extends React.Component {

    render() {
        return <>
            <div className={style.div} >
                <Header></Header>

                <InfectList {...this.props}></InfectList>
            </div>
        </>
    }
}

export default InlandCase;
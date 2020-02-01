import React from 'react';

import style from './InlandCase.module.css';

import { Row, Col, Card, Icon } from 'antd';

class Header extends React.Component {
    render() {
        return <div className={style.header}>
            <div className={style.title}>
                <Icon type="container" style={{ fontSize: '80px' }} />
                <span style={{ marginLeft: '12px', }}>病例</span>
                <Icon type="qq" style={{ fontSize: '30px', marginLeft: '30%' }} />
                <span style={{ fontSize: '30px', lineHeight: '30px', marginLeft: '10px' }}>数据来源于腾讯新闻</span>
            </div>
        </div>
    }
}

class InfectList extends React.Component {
    state = {
        areaTree: []
    }

    refreshState() {
        this.setState({
            areaTree: window.infectData.areaTree
        })
    }

    async componentDidMount() {
        await this.refreshState();
    }

    render() {
        return <>
            <Row className={style.infectListContainer} style={{ height: window.innerHeight - 175 }}>
                <Col span={16} className={style.leftContainer} >
                    <Card title="国内病例" bordered={false} style={{ width: '100%', height: '90%', boxShadow: '4px 4px 5px #888888' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col span={8} className={style.rightContainer}>
                    <Card title="国外病例" bordered={false} style={{ width: '100%', height: '90%', boxShadow: '4px 4px 5px #888888' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
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

                <InfectList></InfectList>
            </div>
        </>
    }
}

export default InlandCase;
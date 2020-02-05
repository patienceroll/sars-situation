import React from 'react';

import style from './LatestNews.module.css';

// ant 组件
import { Icon, Timeline, Card} from 'antd';


class Header extends React.Component {
    render() {
        return <div className={style.header}>
            <div className={style.title}>
                <Icon type="notification" style={{ fontSize: '80px' }} />
                <span style={{ marginLeft: '12px', }}>进展</span>
                <Icon type="clock-circle" style={{ fontSize: '30px', marginLeft: '30%' }} />
                <span style={{ fontSize: '30px', lineHeight: '30px', marginLeft: '10px' }}>数据来源于腾讯新闻</span>
                <span style={{ margin: '0 10px', fontSize: 30 }}>{window.infectData.lastUpdateTime}</span>
                <Icon type="sync" spin={true} style={{ fontSize: '30px' }} />
            </div>
        </div>
    }
}

class NewsBoard extends React.Component {

    state = {
        newsData: []
    }

    async componentDidMount() {
        await this.processData();
        console.log(this.props);
    }

    // 处理新闻数据
    processData() {
        const { latestNewsData } = window;
        const data = JSON.parse(latestNewsData.split('↵').join('')).reverse();
        this.state.newsData.length === 0 && this.setState({
            newsData: data
        })
    }

    renderNewsList() {
        return <Timeline mode="alternate" >
            {this.state.newsData.map((item, index) => <Timeline.Item key={index}>
                <div className={style.timeLine}><Icon type="clock-circle" /> {item.time}</div>
                <div className={style.titleLine}>{item.title}</div>
                <div className={style.descBox}>{item.desc}</div>
                <div className={style.sourceLine}>来源：{item.source}</div>
            </Timeline.Item>)}
        </Timeline>
    }

    render() {
        return <div className={style.newsBoardContainer} style={{ height: window.innerHeight - 175 }}>
            <Card title={<span><Icon type="plus-circle" /> 最新进展</span>}
                bordered={false}
                style={{ width: '100%', height: '100%', boxShadow: '4px 4px 5px #888888', overflow: 'hidden' }}
                headStyle={{ color: '#fff', backgroundColor: '#0099CC', fontSize: '25px', height: '70px', float: 'left', width: '100%' }}
                bodyStyle={{ height: 'inherit', paddingTop: 70, overflow: 'scroll' }}
                onMouseEnter={() => this.props.pageScrollStateChange(false)}
                onMouseLeave={() => this.props.pageScrollStateChange(true)}
            >
                {/* 最新进展列表 */}
                {/* 如果是在第四页才显示此列表 */}
                {this.props.scrollerParam === 3 && this.renderNewsList() || null}
                    
            </Card>
        </div>
    }
}

class LatestNews extends React.Component {

    render() {

        return <>
            <div className={style.div} >

                <Header></Header>

                <NewsBoard {...this.props}></NewsBoard>

            </div>
        </>
    }
}

export default LatestNews;
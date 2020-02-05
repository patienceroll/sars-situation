import React from 'react';
import ReactDOM from 'react-dom';

//样式
import 'antd/dist/antd.css';
import './index.css';

// 组件
import CurrentSituation from './Page/CurrentSituation/CurrentSituation.jsx';
import InlandCase from './Page/InlandCase/InlandCase.jsx';
import VariationTrend from './Page/VariationTrend/VariationTrend.jsx';
import LatestNews from './Page/LatestNews/LatestNews.jsx';

class NavList extends React.Component {
    state = {
        navList: ['实时疫情', '国内病例', '变化趋势', '最新进展']
    }

    render() {
        const { scrollerParam, currentList } = this.props;
        return <>
            <ul className='nav-list-container'>
                {this.state.navList.map((item, index) =>
                    scrollerParam !== index ? <li key={index} onClick={() => currentList(index)}>{item}</li> : <li key={index} onClick={() => currentList(index)} className='current'>{item}</li>)}
            </ul>
        </>
    }
}


class App extends React.Component {

    state = {
        windowHeight: 928,
        // 整个页面处于哪一页的状态
        scrollerParam: 0,
        // 允许整个页面滚动的状态
        pageScroll: true
    }

    componentDidMount() {
        this.setState({
            windowHeight: window.innerHeight
        })
    }

    // 监听滚轮滚动
    handleWheel(e) {
        const { scrollerParam, pageScroll } = this.state;
        e.deltaY > 0 && pageScroll && this.setState({ scrollerParam: scrollerParam === 3 ? 3 : scrollerParam + 1 })
        e.deltaY < 0 && pageScroll && this.setState({ scrollerParam: scrollerParam === 0 ? 0 : scrollerParam - 1 })
    }

    // 传递给NavList组件、CurrentSituation的地图展示组件状态提升的函数
    scrollerParamChange(newScrollerParam) {
        this.setState({
            scrollerParam: newScrollerParam
        })
    }

    // 传递给InlandCase组件的状态提升函数,因为整个页面和长列表同时监听滚动事件
    pageScrollStateChange(newState) {
        this.setState({
            pageScroll: newState
        })
    }

    render() {
        const { windowHeight, scrollerParam } = this.state;
        return <>
            {/* 主页面 */}
            <div className='container' style={{ height: windowHeight }} onWheel={e => { this.handleWheel(e) }}>
                <div className='scroller' style={{ top: -windowHeight * scrollerParam }}>

                    <div style={{ height: windowHeight }}>
                        <CurrentSituation scrollerParam={scrollerParam}></CurrentSituation>
                    </div>

                    <div style={{ height: windowHeight }}>
                        <InlandCase
                            pageScrollStateChange={this.pageScrollStateChange.bind(this)}
                        ></InlandCase>
                    </div>

                    <div style={{ height: windowHeight }}>
                        <VariationTrend></VariationTrend>
                    </div>

                    <div style={{ height: windowHeight }}>
                        <LatestNews
                            pageScrollStateChange={this.pageScrollStateChange.bind(this)}
                            scrollerParam={scrollerParam}
                        ></LatestNews>
                    </div>
                </div>
            </div>

            {/* 导航列表 */}
            <NavList scrollerParam={scrollerParam} currentList={this.scrollerParamChange.bind(this)}></NavList>
        </>
    }
}


ReactDOM.render(<App />, document.getElementById('root'));




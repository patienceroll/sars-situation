import React from 'react';
import ReactDOM from 'react-dom';

//样式
import 'antd/dist/antd.css';
import './index.css';

// 组件
import Map from './Page/Map/Map.jsx';
import InfectData from './Page/InfectData/InfectData.jsx';
import LatestNews from './Page/LatestNews/LatestNews.jsx';
import Home from './Page/Home/Home.jsx';

class NavList extends React.Component {
    state = {
        navList: ['实时疫情', '国内病例', '变化趋势', '最新进展']
    }

    render() {
        const { scrollerParam, currentList } = this.props;
        return <>
            <ul className='nav-list-container'>
                {this.state.navList.map((item, index) =>
                    scrollerParam !== index ? <li key={index} onClick={()=>currentList(index)}>{item}</li> : <li key={index} onClick={()=>currentList(index)} className='current'>{item}</li>)}
            </ul>
        </>
    }
}


class App extends React.Component {

    state = {
        windowHeight: 928,
        scrollerParam: 1
    }

    componentDidMount() {
        this.setState({
            windowHeight: window.innerHeight
        })
    }

    handleWheel(e) {
        const { scrollerParam } = this.state;
        e.deltaY > 0 && this.setState({ scrollerParam: scrollerParam === 3 ? 3 : scrollerParam + 1 })
        e.deltaY < 0 && this.setState({ scrollerParam: scrollerParam === 0 ? 0 : scrollerParam - 1 })
    }

    scrollerParamChange(newScrollerParam) {
        this.setState({
            scrollerParam: newScrollerParam
        })
    }

    render() {
        const { windowHeight, scrollerParam } = this.state;
        return <>
            {/* 主页面 */}
            <div className='container' style={{ height: windowHeight }} onWheel={e => { this.handleWheel(e) }}>
                <div className='scroller' style={{ top: -windowHeight * scrollerParam }}>

                    <div style={{ height: windowHeight }}>
                        <Home></Home>
                    </div>

                    <div style={{ height: windowHeight }}>
                        <Map></Map>
                    </div>

                    <div style={{ height: windowHeight }}>
                        <InfectData></InfectData>
                    </div>

                    <div style={{ height: windowHeight }}>
                        <LatestNews></LatestNews>
                    </div>
                </div>
            </div>

            {/* 导航列表 */}
            <NavList scrollerParam={scrollerParam} currentList={this.scrollerParamChange.bind(this)}></NavList>
        </>
    }
}


ReactDOM.render(<App />, document.getElementById('root'));




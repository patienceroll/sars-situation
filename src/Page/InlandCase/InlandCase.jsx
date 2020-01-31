import React from 'react';

import style from './InlandCase.module.css';


class InlandCase extends React.Component{

    render(){
        return <>
            <div className={style.div} >国内病例，展示的是病例数量</div>
        </>
    }
}

export default InlandCase;
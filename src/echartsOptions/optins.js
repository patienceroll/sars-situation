var trendOptins = (increaseDayList,confirmList,suspectList,healedList,deadList) => ({
    tooltip: {
        trigger: 'axis'
    },
    color:['#D81D1B','#F7AB1A','#178B50','#66666C'],
    legend: {
        data: ['确诊', '疑似', '治愈', '死亡'],
        textStyle: {
            fontSize: 15.75
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: increaseDayList
    },
    yAxis: [
        {
            name: '确诊、疑似(粗线)',
            type: 'value',
            nameTextStyle: {
                fontSize: 15
            }
        },
        {
            name: '治愈、死亡(细线)',
            type: 'value',
            nameTextStyle: {
                fontSize: 15
            }
        }
    ],
    series: [
        {
            name: '确诊',
            type: 'line',
            data: confirmList,
            lineStyle: {
                color: '#D81D1B',
                width: 4.5
            }
        },
        {
            name: '疑似',
            type: 'line',
            data: suspectList,
            lineStyle: {
                color: '#F7AB1A',
                width: 4.5
            }
        },
        {
            name: '治愈',
            yAxisIndex: 1,
            type: 'line',
            data: healedList,
            lineStyle: {
                color: '#178B50',
                width: 2.25
            }
        },
        {
            name: '死亡',
            yAxisIndex: 1,
            type: 'line',
            data: deadList,
            lineStyle: {
                color: '#66666C',
                width: 2.25
            }
        }
    ]
});


var increaseTrendOptins =(dayList,dayConfirmList,daySuspectList)=> ({
    tooltip: {
        trigger: 'axis'
    },
    color:['#D81D1B','#F7AB1A'],
    legend: {
        data: ['新增确诊', '新增疑似'],
        textStyle: {
            fontSize: 18.75
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dayList
    },
    yAxis: {
        name: '数量(人)',
        type: 'value',
        nameTextStyle: {
            fontSize: 15
        }
    },
    series: [
        {
            name: '新增确诊',
            type: 'line',
            data: dayConfirmList,
            lineStyle: {
                color: '#D81D1B',
                width: 3
            }
        },
        {
            name: '新增疑似',
            type: 'line',
            data: daySuspectList,
            lineStyle: {
                color: '#F7AB1A',
                width: 3
            }
        }
    ]
});

export {
    trendOptins,
    increaseTrendOptins
}
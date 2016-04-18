/**
 * Created by xxx on 2016/4/15.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();                   // a<b? d :e  如何a<b 执行d 否则执行 e
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);                           //math.ceil(a) 取靠近a的整数
        returnData[datStr] = Math.ceil(Math.random() * seed);   //math.random 返回一个0~1的小数
        dat.setDate(dat.getDate() + 1)   //dat.getdate获得一天 setdate 设置这个月的某一天
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

    var myChart = document.getElementById("aqi-chart-wrap");
    var text = '';
    var color = '';
    for (var city in chartData) {    //parseInt 取整数
        color = 'rgb(' + parseInt(256 * Math.random()) + ',' +           //产生随机颜色
            parseInt(256 * Math.random()) + ',' + parseInt(256 * Math.random()) + ')';
        text += '<div id="city" style="height: ' + chartData[city] +
            'px;background-color: ' + color + '"></div>';

    }
    myChart.innerHTML = text;

}
    // 指定图表的配置项和数据
     /* var arr = [1,2,3,4];
    for (var city in chartData){
        chartData[city].push;
    }
    var option = {
        title: {
            text: '城市空气质量'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            name: '时间',
            data:chartData
        },
        yAxis: {
            name:'空气质量'
        },
        series: [{
            name: '销量',
            type: 'bar',
            data: chartData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);*/



/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var time_select = document.getElementsByTagName("input");
    for (var i = 0; i < time_select.length; i++) {
        if (time_select[i].checked && time_select[i].value != pageState.nowGraTime) {
            pageState.nowGraTime = time_select[i].value;
        }
    }
    initAqiChartData();
    renderChart();

    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    switch (e){
        case '北京':pageState.nowSelectCity = '北京'; break;
        case '上海':pageState.nowSelectCity = '上海'; break;
        case '广州':pageState.nowSelectCity = '广州'; break;
        case '深圳':pageState.nowSelectCity = '深圳'; break;
        case '成都':pageState.nowSelectCity = '西安'; break;
        case '福州':pageState.nowSelectCity = '福州'; break;
        case '厦门':pageState.nowSelectCity = '厦门'; break;
        case '沈阳':pageState.nowSelectCity = '沈阳'; break;
        default :break;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var form = document.getElementById("form-gra-time").onclick = function(){
        graTimeChange();
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city_select = document.getElementById("city-select");
    for(var city in aqiSourceData){
        var city_el = document.createElement("option");
        city_select.appendChild(city_el);
        city_el.innerHTML = city;
    }
    citySelectChange();
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city_select.onchange = function (){
        citySelectChange(city_select.value);
    }

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    var cha_data = aqiSourceData[pageState.nowSelectCity];
    switch (pageState.nowGraTime){
        case 'day':
                chartData = aqiSourceData[pageState.nowSelectCity];
            //console.log(chartData["2016-01-01"]);
            break;
        case 'week':
            chartData = {};
            var dat = new Date("2016-01-01");
            var  datStr = '';
            for (var time = 0; time <13; time++){
                for (var i=0; i<7; i++){
                    datStr = getDateStr(dat);
                    var average = 0;
                    average += cha_data[datStr];
                    dat.setDate(dat.getDate() + 1);
                }
                chartData[time] = parseInt(average);
            }
            console.log(chartData);
            break;

        case 'month':
            chartData ={};
            var dat = new Date("2016-01-01");
            var  datStr = '';
            for (var j=0; j<3;j++){
                for (var i=0;i<30;i++){
                    datStr = getDateStr(dat);
                    var average = 0;
                    average += cha_data[datStr];
                    dat.setDate(dat.getDate() + 1);
                }
                chartData[j] = parseInt(average);
            }
            break;

        default:break;
    }


}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();

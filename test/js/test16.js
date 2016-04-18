/**
 * Created by xxx on 2016/4/13.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};
var city_el = document.getElementById("aqi-city-input");
var value_el = document.getElementById("aqi-value-input");
var table_el  = document.getElementById("aqi-table");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = city_el.value;
    var num = value_el.value;
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!num.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[city]= num;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    table_el.innerHTML = "";
    for (var city in aqiData){
        var tr_el = document.createElement("tr");
        table_el.appendChild(tr_el);
        var td_el = document.createElement("td");
        td_el.innerText = city;
        tr_el.appendChild(td_el);
        var td_el = document.createElement("td");
        td_el.innerText = aqiData[city];
        tr_el.appendChild(td_el);
        var button_create = document.createElement("button");
        button_create.innerHTML = "删除";
        button_create.id ="delete-btn";
        tr_el.appendChild(button_create);

    }


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */

function delBtnHandle(e) {
    // do sth.
    var parent = e.parentElement;
    var city = parent.children[0].innerHTML;
    delete aqiData[city];
    renderAqiList();
}
function init(){
    document.getElementById("add-btn").onclick = function(){
        addBtnHandle();
    }
    table_el.addEventListener("click",function(e){
        if (e.target && e.target.nodeName === 'BUTTON'){
            delBtnHandle(e.target);
        }
    });

}
init();
/*
监听事件中e.target=返回的是这个事件就可以认为是this
e.target.nodeName 返回的全部大写的英文字母如："BUTTON","DIV"
==是值相等，当类型不等时候会转换
=== 是类型和值都相等。类型不等时候直接是false
*/


        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数





/**
 * Created by xxx on 2016/4/17.
 */

var text_input = document.getElementById("text-input");
var btn_select = document.getElementsByTagName("button");
var text_table = document.getElementById("text-table");
var text_chart = document.getElementById("text-chart");
var sort_btn = document.getElementById("sort");
var numData=[];
function selectbtn(){

    if (text_table.children.length >60){
        alert(text_table.value);
        return;
    }

    document.getElementById("left-input").onclick = function (){
        if(/^[0-9]+/.test(text_input.value)) {
            if(text_input.value>=10 && text_input.value<=100) {
                var div_el = document.createElement('div');
                div_el.innerHTML = text_input.value;
                text_table.appendChild(div_el);
                text_table.insertBefore(div_el, text_table.firstChild);
                numData.unshift(text_input.value);
            }
            else {
                alert("数字为10-100");
                return;
            }
        }else {
            alert("数字不可为空和必须为整数");
            return;
        }

    }
    document.getElementById("right-input").onclick = function (){
        if(/^[0-9]+/.test(text_input.value)) {
            if(text_input.value>=10 && text_input.value<=100) {
                var div_el = document.createElement('div');
                div_el.innerHTML = text_input.value;
                text_table.appendChild(div_el);
                text_table.insertBefore(div_el, text_table.lastChild);
                numData.push(text_input.value);
            }
            else {
                alert("数字为10-100");
                return;
            }
        }else {
            alert("数字不可为空和必须为整数");
            return;
        }

    }
    document.getElementById("left-output").onclick = function () {
        if(text_table.children.length > 0) {
            text_table.removeChild(text_table.children[0]);
            numData.shift();
        }
        else {
            alert("没有元素了请添加");
            return;
        }
    }
    document.getElementById("right-output").onclick = function () {
        if(text_table.children.length > 0) {
            text_table.removeChild(text_table.children[0]);
            numData.pop();

        }
        else {
            alert("没有元素了请添加");
            return;
        }
    }

}
function innitdata(){
    for (var num=0;  num < 30; num++){
        numData[num] = Math.ceil(Math.random()*100);
    }
    console.log(numData);
}
function renderdata(){
    var color = ["#EE6775","#7866EE","#6BEE8B","#EEC561","#44EEE0","#DC66EE"];
    var tex = '';
    for (var num in numData){
        tex += '<div style="height:'+numData[num]*5+'px;background-color: '+color[num%6]+'"></div>';
    }
    text_chart.innerHTML = tex;
}
function inputevent(){
    text_input.onchange = function(){
        selectbtn();
    }
}
function numSort(){
    var j,i=0;
    var num = true;
    while (num) {
        if (numData[j] > numData[i + 1]) {
            var temp = numData[j + 1];
            numData[j + 1] = numData[j];
            numData[j] = temp;
            renderdata;
            num = false;
        }
        i++;
    }

}



function init(){
    innitdata();
    renderdata();
    sort_btn.onclick =function(){
        numSort();
    }
    inputevent();
    console.log(numData);


}
init();
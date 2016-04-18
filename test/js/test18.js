/**
 * Created by xxx on 2016/4/17.
 */


var text_input = document.getElementById("text-input");
var btn_select = document.getElementsByTagName("button");
var text_table = document.getElementById("text-table");
var num_input = document.getElementById("num-input");
function selectvalue(){
    if(!text_input.value.match(/^\d+$/)) {
        alert("数字必须为整数！")
        return;
    }
}
function selectbtn(){
    document.getElementById("left-input").onclick = function (){
        var div_el = document.createElement('div');
        div_el.innerHTML = text_input.value;
        text_table.appendChild(div_el);
        text_table.insertBefore(div_el,text_table.firstChild);

    }
    document.getElementById("right-input").onclick = function (){
        var div_el = document.createElement('div');
        div_el.innerHTML = text_input.value;
        text_table.appendChild(div_el);
        text_table.insertBefore(div_el,text_table.lastChild);

    }
    document.getElementById("left-output").onclick = function () {
            if(text_table.children.length > 0) {
                text_table.removeChild(text_table.children[0]);
            }
            else {
                alert("没有元素了请添加");
                return;
            }
        }
    document.getElementById("right-output").onclick = function () {
            if(text_table.children.length > 0) {
                text_table.removeChild(text_table.children[0]);

            }
            else {
                alert("没有元素了请添加");
                return;
            }
        }

}
function inputevent(){
    text_input.onchange = function(){
        selectvalue()

    }
}
function init(){
    inputevent();
    selectbtn();

}
init();
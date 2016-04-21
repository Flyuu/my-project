/**
 * Created by xxx on 2016/4/17.
 */

var text_input = document.getElementById("text-input");
var text_table = document.getElementById("text-table");
var sort_btn = document.getElementById("sort");
var select_key = document.getElementById("text-select");
var numData=[];
function selectBtn(){
    if (text_table.children.length >60){
        alert(text_table.value);
        return;
    }
    document.getElementById("left-input").onclick = function (){
        var tex = text_input.value;
        numData = tex.split(/ |,|\r|\n|\t|、/);   //  将输入的字符转化为数组，
        for (var num in numData){                 //当需要一个字符时候 为split(" "); 多个要split(/,| /)
            var div_el = document.createElement('div');
            div_el.innerHTML =numData[num] ;
            text_table.appendChild(div_el);
        }
    };
}
function selectKey(){
    if(text_table.children.length == 0){
        alert("没有元素");
        return false;
    }
    var my_key = true;
    for (var i = 0; i <text_table.children.length; i++){
        if(text_table.children[i].innerHTML == select_key.value){
            text_table.children[i].style.backgroundColor = "green";
            my_key = false;
        }
    }
    if (my_key){
        alert("没有找到该元素");
    }

}
function init(){
    selectBtn();
    sort_btn.onclick =function(){
        selectKey();
    };
}
init();
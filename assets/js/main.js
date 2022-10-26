//インポート、エクスポート
import {addTaskList} from "./addTaskList.js";
import {submitBtn,deleteAll} from "./Buttons.js";
export {jsonArray,setJson};

//データピッカーを呼び出す
$(function() {
    $.datetimepicker.setLocale('ja');
    $('#newDate').datetimepicker({
        theme:"dark",
        minDate:new Date(),
        step:5
    });
});

//フォームの値、ローカルストレージのjsonを代入
let jsonArray=[];
function setJson(arr){
    jsonArray = arr;
}
//ページを開いた時にローカルストレージにデータがある場合に取り出してタスクリストに表示する
if(localStorage.getItem("formData") !== null){
    addTaskList();
}

//submitをトリガーとしてタスクを追加する処理を呼び出し
//フォームの取得
let form = document.getElementById("newToDo");
form.addEventListener("submit",function(e){
    submitBtn(e);
});

//deleteAllボタンを押したときにすべてのタスクを削除する処理を呼び出す
document.getElementById("delAll").addEventListener("click",function(){
    deleteAll();
});

//jQueryでソートの有効無効の切り替えの呼び出し
import {sortEnable,sortDisable} from "./sortTaskList.js";

$(function (){
    let judge = false;
    $("#sortTask").click(function(){
        if(judge){  
            judge = sortDisable();
            addTaskList(jsonArray);
        }else{
            judge = sortEnable();
        }
    });
});
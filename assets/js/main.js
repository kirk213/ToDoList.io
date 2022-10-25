//フォームの取得
let form = document.getElementById("newToDo");
//フォームの値、ローカルストレージのjsonを代入
let jsonArray=[];
function setJson(arr){
    jsonArray = arr;
}

//addTaskListのインポート、エクスポート
import { addTaskList } from "./addTaskList.js";
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


//ページを開いた時にローカルストレージにデータがある場合に取り出してタスクリストに表示する
if(localStorage.getItem("formData") !== null){
    addTaskList();
}

//submitをトリガーとしてフォームデータを取得するイベント
form.addEventListener("submit",function(e){

    e.preventDefault();
    let text = document.getElementById("newInput").value;
    let date = document.getElementById("newDate").value;
    console.log(text);
    console.log(date);
    //テキストが入力されていない場合のアラート
    if(text === ""){
        window.setTimeout(function(){alert("タスクを入力してください");}, 200);
        return;
    }//日付が入力されていない場合のアラート
    if(date === ""){
        window.setTimeout(function(){alert("日付を入力してください。");}, 200);
        return;
    }
    //配列に追加
    jsonArray.push({"text":text,"date":date,"check":false}); 
    console.log(jsonArray);
    //ローカルストレージに保存
    localStorage.setItem('formData',JSON.stringify(jsonArray));
    //addTaskListを呼び出してタスクリストの再表示
    addTaskList();
});


/*deleteAllボタンを押したときの動作
delallを受け取って、クリックをイベントトリガーに設定
発火後、confirmを許可するとjsonarrayをクリアする*/
document.getElementById("delAll").addEventListener("click",function(){
    window.setTimeout(function(){
        let result = window.confirm("すべてのタスクを消しますか？");
        if(result){
            jsonArray.length = 0;
            //ローカルストレージに保存
            localStorage.setItem("formData",JSON.stringify(jsonArray));
            //addTaskListを呼び出してタスクリストの再表示
            addTaskList();
        };
    },200);
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
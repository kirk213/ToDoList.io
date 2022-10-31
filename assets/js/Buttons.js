import {addTaskList} from "./addTaskList.js";
import {jsonArray} from "./main.js";
export {submitBtn,deleteAll}


//submitボタンによって呼び出される処理
function submitBtn(e){
    //フォームの動作をキャンセル
    e.preventDefault();
    //入力されたタスクと日付の取得
    let text = document.getElementById("newInput");
    let date = document.getElementById("newDate");

    //テキストが入力されていない場合のアラート
    if(text.value === ""){
        window.setTimeout(function(){alert("タスクを入力してください");}, 200);
        return;
    }//日付が入力されていない場合のアラート
    if(date.value === ""){
        window.setTimeout(function(){alert("日付を入力してください。");}, 200);
        return;
    }
    //配列に追加
    jsonArray.push({"text":text.value,"date":date.value,"check":false}); 
    //ローカルストレージに保存
    localStorage.setItem('formData',JSON.stringify(jsonArray));
    //入力欄をクリア
    text.value="";
    date.value="";
    //addTaskListを呼び出してタスクリストの再表示
    addTaskList();
}



//confirmを許可するとjsonarrayをクリアする
function deleteAll(){
    //タイムアウトを追加
    window.setTimeout(function(){
        //タスクを消すか、y/nのポップアップを表示
        let result = window.confirm("すべてのタスクを消しますか？");
        if(result){
            jsonArray.length = 0;
            //ローカルストレージに保存
            localStorage.setItem("formData",JSON.stringify(jsonArray));
            //addTaskListを呼び出してタスクリストの再表示
            addTaskList();
        };
    },200);
}
    
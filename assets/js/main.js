//フォームの取得
let form = document.getElementById('newToDo');
//フォームの値、ローカルストレージのjsonを代入
let jsonArray=[];



//ページを開いた時にローカルストレージにデータがある場合に取り出してタスクリストに表示する
if(localStorage.getItem('formData') !== null){
    jsonArray = JSON.parse(localStorage.getItem('formData'));
    addTaskList(jsonArray);
}


//submitをトリガーとしてフォームデータを取得するイベント
form.addEventListener("submit",function(e){
    e.preventDefault();
    let text = document.getElementById('newInput').value;
    let date = document.getElementById('newDate').value;
    //テキストが入力されていない場合のアラート
    if(text === ""){
        alert("タスクを入力してから追加してください。");
        return;
    }//日付が入力されていない場合のアラート
    if(date === ""){
        alert("日付を入力してから追加してください。");
        return;
    }
    //配列に追加
    jsonArray.push({"text":text,"date":date}); 
    console.log(jsonArray);
    //ローカルストレージに保存
    localStorage.setItem('formData',JSON.stringify(jsonArray));
    //addTaskListを呼び出してタスクリストの再表示
    addTaskList(jsonArray);
});


/*deleteAllボタンを押したときの動作
delallを受け取って、クリックをイベントトリガーに設定
発火後、confirmを許可するとjsonarrayをクリアする*/
document.getElementById("delAll").addEventListener("click",function(){
    let result = window.confirm("すべてのタスクを消しますか？");
    if(result){
        jsonArray.length = 0;
        //ローカルストレージに保存
        localStorage.setItem('formData',JSON.stringify(jsonArray));
        //addTaskListを呼び出してタスクリストの再表示
        addTaskList(jsonArray);
    };
});



//関数系
function addTaskList(){
    //タスクリストのdivを取得
    let taskList = document.getElementById("taskList");
    //htmlに追加されている要素を一度削除
    taskList.innerHTML="";

    jsonArray.forEach(function(array){
        //追加する要素の作成
        let taskRecord = document.createElement("div");
        taskRecord.classList.add("taskRecord");
        
        //テキストと日付
        let content = document.createElement("div");
        content.classList.add("content");
        
        let text = document.createElement("input");
        text.setAttribute("type","text");
        text.setAttribute("class","text");
        text.setAttribute("value",array.text);
        text.setAttribute("readOnly","true");
        
        content.appendChild(text);
        
        let date = document.createElement("input");
        date.setAttribute("type","date");
        date.setAttribute("class","date");
        date.setAttribute("value",array.date);
        date.setAttribute("readOnly","true");
    
        content.appendChild(date);
        
        //編集と削除
        let actions = document.createElement("div");
        actions.classList.add("actions");
        let edit = document.createElement("button");
        edit.classList.add("edit");
        edit.innerHTML="Edit";
        let del = document.createElement("button");
        del.classList.add("delete");
        del.innerHTML="Delete";
        
        actions.appendChild(edit);
        actions.appendChild(del);
        
        //contentとactionsをtaskRecordにまとめて、taskListに追加
        taskRecord.appendChild(content);
        taskRecord.appendChild(actions);
        taskList.appendChild(taskRecord);
        
        
        //editボタンを押した時の動作
        edit.addEventListener('click',function(){
            //編集時にsaveを押したときにボタンをeditに戻す
            if(this.innerHTML==="Save"){
                this.innerHTML="Edit";
                //readonlyを戻す
                text.readOnly="true";
                date.readOnly="true";
                alert("変更が保存されました");
                /*変更した値を取得してforeachで回してる今の配列内のオブジェクトの値と入れ替えて、
                ローカルストレージに保存し直してaddTaskList関数で変更後のタスクを再表示*/
                array.text = text.value;
                array.date = date.value;
                localStorage.setItem('formData',JSON.stringify(jsonArray));
                return addTaskList();
            }
            //editボタン押した時にボタンをsaveに変更
            this.innerHTML="Save";
            //クラス名をトグルしてstyleを変更
            this.classList.toggle("edit");
            this.classList.toggle("save");
            //readonlyを外して、テキスト欄にォーカスをあわせる
            text.removeAttribute("readOnly");
            date.removeAttribute("readOnly");
            text.focus();
        });
    
        
        //deleteボタンを押したときの動作
        del.addEventListener('click',function(){
            jsonArray = jsonArray.filter(function(arr){
                return arr !== array;
            });
            localStorage.setItem('formData',JSON.stringify(jsonArray));
            addTaskList();
        });   

        
    });
};
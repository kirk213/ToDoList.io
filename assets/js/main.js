//フォームの取得
let form = document.getElementById('newToDo');
//フォームの値、ローカルストレージのjsonを代入
let jsonArray=[];

//ページを開いた時にローカルストレージにデータがある場合に取り出してタスクリストに表示する
if(localStorage.getItem('formData') !== null){
    jsonArray = JSON.parse(localStorage.getItem('formData'));
    for(let i = 0;i<jsonArray.length;i++){
        addTaskList(jsonArray[i].text,jsonArray[i].date);
    }    
}

//submitをトリガーとしてフォームデータを取得するイベント
form.addEventListener("submit",function(e){
    e.preventDefault();
    let text = document.getElementById('newInput').value;
    let date = document.getElementById('newDate').value;
    document.getElementById('newInput').value="";
    document.getElementById('newDate').value="";
    //addTaskList関数でタスクリストに追加
    addTaskList(text,date);
    jsonArray.push({"text":text,"date":date}); 
    //ローカルストレージに保存して再取得
    localStorage.setItem('formData',JSON.stringify(jsonArray));
    jsonArray = JSON.parse(localStorage.getItem('formData'));
});


//関数系
function addTaskList(textValue,dateValue){
    //テキストが入力されていない場合のアラート
    if(textValue === ""){
        alert("タスクを入力してから追加してください。");
        exit;
    }//日付が入力されていない場合のアラート
    if(dateValue === ""){
        alert("日付を入力してから追加してください。");
        exit;
    }

    //タスクリストのdivを取得
    let taskList = document.getElementById("taskList");
    //追加する要素の作成
    let taskRecord = document.createElement("div");
    taskRecord.classList.add("taskRecord");
    
    //テキストと日付
    let content = document.createElement("div");
    content.classList.add("content");
    
    let text = document.createElement("input");
    text.setAttribute("type","text");
    text.setAttribute("class","text");
    text.setAttribute("value",textValue);
    text.setAttribute("readOnly","true");
    
    content.appendChild(text);

    let date = document.createElement("input");
    date.setAttribute("type","date");
    date.setAttribute("class","date");
    date.setAttribute("value",dateValue);
    date.setAttribute("readOnly","true");
        
    content.appendChild(date);
    
    //編集と削除
    let actions = document.createElement("div");
    actions.classList.add("actions");
    let edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent="Edit";
    let del = document.createElement("button");
    del.classList.add("delete");
    del.textContent="Delete";
    
    actions.appendChild(edit);
    actions.appendChild(del);
    
    taskRecord.appendChild(content);
    taskRecord.appendChild(actions);
    taskList.appendChild(taskRecord);


    //editボタンを押した時の動作
    edit.addEventListener('click',function(){
        if(this.innerHTML==="Save"){
            this.innerHTML="Edit";
            console.log(text);
            text.readOnly="true";
            date.readOnly="true";
            alert("変更が保存されました");
            return;
        }
        this.innerHTML="Save";
        this.classList.toggle("edit");
        this.classList.toggle("save");
        text.removeAttribute("readOnly");
        date.removeAttribute("readOnly");
        text.focus();
    });

    //deleteボタンを押したときの動作
    del.addEventListener('click',function(){
        taskList.removeChild(taskRecord);
    });

};





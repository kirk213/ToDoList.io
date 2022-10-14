//フォームの取得
let form = document.getElementById("newToDo");
//フォームの値、ローカルストレージのjsonを代入
let jsonArray=[];

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
    console.log(date);
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
    jsonArray.push({"text":text,"date":date,"check":false}); 
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
        localStorage.setItem("formData",JSON.stringify(jsonArray));
        //addTaskListを呼び出してタスクリストの再表示
        addTaskList(jsonArray);
    };
});



//関数系
function addTaskList(){
    //ローカルから受け取り
    jsonArray = JSON.parse(localStorage.getItem("formData"));
    //タスクリストのdivを取得
    let taskList = document.getElementById("taskList");
    //htmlに追加されている要素を一度削除
    taskList.innerHTML="";

    jsonArray.forEach(function(array){
        //追加する要素の作成
        let taskRecord = document.createElement("div");
        taskRecord.classList.add("taskRecord");
        
        //チェックボックスとテキストと日付
        let content = document.createElement("div");
        content.classList.add("content");
        let labelDiv = document.createElement("div");
        labelDiv.classList.add("labelDiv");
        let label = document.createElement("label");
        label.classList.add("checklabel");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","checkbox");
        //チェック状況をローカルから受け取って代入後、状況に応じてクラスを追加または削除
        checkbox.checked= array.check;
        if(array.check){
            label.classList.add("label_checked");
        }else{
            label.classList.remove("label_checked");
        }

        let arrow = document.createElement("img");
        arrow.setAttribute("src","./assets/img/arrow.png");


        label.appendChild(checkbox);
        labelDiv.appendChild(label);
        labelDiv.appendChild(arrow);
        
        let text = document.createElement("input");
        text.setAttribute("type","text");
        text.setAttribute("class","text");
        text.setAttribute("value",array.text);
        text.setAttribute("readOnly","true");
        
        
        content.appendChild(labelDiv);
        content.appendChild(text);
       

        //コメントと日付

        let dateDiv = document.createElement("div");
        dateDiv.classList.add("dateDiv");

        let placeholder = document.createElement("input");
        placeholder.setAttribute("type","text");
        placeholder.classList.add("placeholder");
        placeholder.setAttribute("value","日時をクリックで変更 :")
        placeholder.setAttribute("readOnly","true");
        
        let date = document.createElement("input");
        date.setAttribute("type","text");
        date.setAttribute("class","date");
        date.setAttribute("value",array.date);
        date.setAttribute("readOnly","true");
        
        dateDiv.appendChild(placeholder);
        dateDiv.appendChild(date);
        
        
        //編集と削除
        let actions = document.createElement("div");
        actions.classList.add("actions");
        let edit = document.createElement("button");
        edit.classList.add("edit");
        edit.innerHTML="Edit";
        let del = document.createElement("button");
        del.classList.add("delete");
        del.innerHTML="Delete";
        
        actions.appendChild(dateDiv);
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
                dateDiv.style.paddingRight="2rem";
                //readonlyを戻す
                text.readOnly="true";
                date.readOnly="true";
                placeholder.style.color="rgb(66, 66, 66)"
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
            dateDiv.style.paddingRight="1.9rem";
            //readonlyを外して、テキスト欄にォーカスをあわせる
            text.removeAttribute("readOnly");
            date.removeAttribute("readOnly");
            placeholder.style.color="rgba(255, 255, 255, 0.87)"
            $(function() {
                $.datetimepicker.setLocale('ja');
                $(date).datetimepicker({
                    theme:"dark",
                    minDate:new Date(),
                    step:5
                });
            });
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
        
        //checkボタンを押したときの動作
        checkbox.addEventListener('change',function(){
            //チェック状況を代入
            array.check = this.checked;       
            localStorage.setItem('formData',JSON.stringify(jsonArray));
            if(array.check){
                label.classList.add("label_checked");
            }else{
                label.classList.remove("label_checked");
            }
        })  
    });
};


//jQueryでソートの有効無効を切り替え
$(function(){
    let judge = false;
    $("#sortTask").click(function(){
        if(judge){  
            sortDisable();
        }else{
            sortEnable();
        }
    });
    //ソート有効時
    function sortEnable(){
        console.log("enable");
        let div = $(".labelDiv");
        div.children('label').css('display','none');
        div.children('img').css('display','block');
        $("#taskList").sortable({
            disabled:false,
            handle:".labelDiv",
            axis:"y",
            revert:true,
            opacity:"0.8"
        });
        judge = true;
    };
    //ソート無効時
    function sortDisable(){
        console.log("disable");
        let div = $(".labelDiv");
        div.children("label").css('display','block');
        div.children("img").css('display','none');
        $("#taskList").sortable({
            disabled:true
        });
        judge = false;
        
    //要素を取得してlocalstrageに追加してからタスクリストを再表示
        //配列をクリア
        jsonArray.length = 0;

        //要素を取得して配列に追加
        $(".taskRecord").each(function(){
            let elem = $(this)[0];
            let text = $(elem).find(".text").val()
            let date = $(elem).find(".date").val()
            let check = $(elem).find(".checkbox").prop("checked");
            
            jsonArray.push({"text":text,"date":date,"check":check}); 
            
        });
        //追加が終わったら配列をローカルストレージに保存
        localStorage.setItem("formData",JSON.stringify(jsonArray));
        addTaskList(jsonArray);
    };
});
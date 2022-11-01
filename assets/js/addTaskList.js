//インポート、エクスポート
import {jsonArray,setJson} from "./main.js";
export {addTaskList};

//関数系
function addTaskList(){
    //ローカルから受け取り
    setJson(JSON.parse(localStorage.getItem("formData")));
    //タスクリストのdivを取得
    let taskList = document.getElementById("taskList");
    //htmlに追加されている要素を一度削除
    taskList.innerHTML="";

    jsonArray.forEach(function(array){
        //追加する要素の作成
        let taskRecord = document.createElement("div");
        taskRecord.classList.add("taskRecord");
        
        //チェックボックス
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
        
        content.appendChild(labelDiv);

        
        //タスク
        let text = document.createElement("input");
        text.setAttribute("type","text");
        text.setAttribute("class","text");
        text.setAttribute("value",array.text);
        text.setAttribute("readOnly","true");
        
        
        //編集時のテキストと日付
        
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("dateDiv");
        
        let placeholder = document.createElement("input");
        placeholder.setAttribute("type","text");
        placeholder.classList.add("placeholder");
        placeholder.setAttribute("value",": 日付をクリックで変更")
        placeholder.setAttribute("readOnly","true");
        
        let date = document.createElement("input");
        date.setAttribute("type","text");
        date.setAttribute("class","date");
        date.setAttribute("value",array.date);
        date.setAttribute("readOnly","true");
        date.setAttribute("inputmode","none");
        
        dateDiv.appendChild(date);
        dateDiv.appendChild(placeholder);
        
        //タスクと日付を入れるdiv
        let table = document.createElement("div");
        table.classList.add("tableDiv");

        table.appendChild(text);
        table.appendChild(dateDiv);
        content.appendChild(table);
        
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
                dateDiv.style.paddingRight="2rem";
                //readonlyを戻す
                text.readOnly="true";
                date.readOnly="true";
                placeholder.classList.add("placeholder");
                placeholder.classList.remove("placeholderEnable");
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
            placeholder.classList.add("placeholderEnable");
            placeholder.classList.remove("placeholder");
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
            //フィルターで対象のタスク以外をsetJson関数に渡すしてjsonArrayに代入
            setJson(jsonArray.filter(function(arr){
                return arr !== array;
            }));
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
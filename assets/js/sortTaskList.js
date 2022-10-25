//インポート、エクスポート
import { jsonArray } from "./main.js";
export {sortEnable,sortDisable} ;

//ソート有効時
function sortEnable(){
    console.log("enable");
    let sw = $("#sortTask");
    sw.css('background-color','rgb(57, 197, 207)');
    sw.css('transition','0.2s all linear');
    let div = $(".labelDiv");
    div.children('label').css('display','none');
    div.children('img').css('display','block');
    $("#taskList").sortable({
        disabled:false,
        handle:".labelDiv",
        cursor:"move",
        axis:"y",
        revert:"100",
        opacity:"0.8"
    });
    return true;
};

//ソート無効時
function sortDisable(){
    console.log("disable");
    let sw = $("#sortTask");
    sw.css('background-color','rgb(66, 66, 66)');
    sw.css('transition','0.2s all linear');
    let div = $(".labelDiv");
    div.children("label").css('display','block');
    div.children("img").css('display','none');
    $("#taskList").sortable({
        disabled:true
    });
        
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
    return false;
};
export {test}
//オーバレイの表示、非表示
$("#overlayTask").click(function(e){
    e.stopPropagation();
})

$("#overlay,#closeBtn").click(function(){
    $("#overlay").fadeOut();
});

//親タスクの表示
function test(index,array){
    $("#overlay").fadeIn().css('display','flex');;
    $("#parentTask").val(array[index].text);
    $("#parentDate").val(array[index].date);
}



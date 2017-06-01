var colorChoices = [
    { 'choice': '#ed0a71' },
    { 'choice': '#ef4036' },
    { 'choice': '#f7941e' },
    { 'choice': '#fcb040' },
    { 'choice': '#fdef00' },
    { 'choice': '#8cc63f' },
    { 'choice': '#0b9444' },
    { 'choice': '#13a89e' },
    { 'choice': '#0084cb' },
    { 'choice': '#46549e' },
    { 'choice': '#662d91' },
    { 'choice': '#92278f' }
];





var stickersData = [
];

$(document).ready(function() {
    $(".dashboard").dblclick(function() {
        //alert("Your book is overdue.");
        addNewSticker();
    });
    
});






function addNewSticker(){
        var d = new Date();
        var timeNow=d.getTime();
        stickersData.push({
        'title'  : 'New title' ,'content': 'Some note' ,'length' : '' ,'wide'   : '' ,'top'    : '' ,'left'   : '' ,'bgcolor'  : '' ,'time'   : timeNow
        });
        $(".dashboardUl").append("<li><a id='"+timeNow+"' href='#'><h2>New Title</h2><p>Some note</p></a></li>");
}


function getStickerObj(sticktime){
for(var i=0;i<stickersData.length;i++){
    if(sticktime==stickersData[i].time)
        return stickersData[i];
}
}


$(document).ready(function() {
    $(this).click(function(event) {
       console.log (getStickerObj(event.target.id));
    //    alert(stickersData[0].time);
    });
});
















$(window).load(function() {
    $(".btn-nav").on("click tap", function() {
        $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
addNewSticker();
    for (var i = 0; i < 12; i++) {
        $(".nav-list").append("<li class='list-item' style='background-color:" + colorChoices[i].choice + "'><a></a></li>");
    }
});
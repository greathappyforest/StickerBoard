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


var stickersData = [];

$(document).ready(function() {

    $(".dashboard").on("dblclick", function(event) {
        //alert("Your book is overdue.");
        var target = $(event.target);
        if (target.is('ul') || target.is('a')|| target.is('li')|| target.is('contains')|| target.is('hr')) {
            return;
        }
        addNewSticker();
    });
});




function random13dig(){
var min = 1000000000000;
var max = 9999999999999;
return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function addNewSticker() {
    var d = new Date();
    var timeNow = d.getTime();
    stickersData.push({
        'Tag': ['tag1', 'tag2'],
        'content': ['Some note1', 'some note2'],
        'length': '',
        'wide': '',
        'top': '',
        'left': '',
        'bgcolor': '',
        'time': timeNow
    });
    $(".dashboardUl").append("<li><a id=stickerId" +  random13dig() + " href='#'><h2 id=h"+random13dig()+"><contains class='tag' id=tag" + random13dig() + 
        ">tag1</contains> <contains class='tag' id=tag" + random13dig() + ">tag2</contains> </h2><hr /><contains class='stickerPara' id=stickerpara" + random13dig() + 
        ">some note1</contains><hr /><contains class='stickerPara' id=stickerpara" + random13dig() + ">some note2</contains></a></li>");
}


function getStickerObj(sticktime) {
    for (var i = 0; i < stickersData.length; i++) {
        if (sticktime == stickersData[i].time)
            return stickersData[i];
    }
}






// click stickerObj event-------------------------------------------------------


var toggle = false;
var stickerjson = [];
var currobj = {};
$(document).ready(function() {
    $(this).on('click', function(event) {
        // console.log(event.target);
        // console.log(toggle);
        var target = $(event.target);
        var Regpat = /stickerId\d{13}/;
        //use reg express parsing and check stickerid
        if ((String(event.target.id)).match(Regpat) == event.target.id) {
                        if(target.css( 'height' )>'15em'){
                return;
            }
            //reset all sticker
            for (var i = 0; i < stickerjson.length; i++) {
                if (stickerjson[i].toggle == true) {
                    $(stickerjson[i].obj).animate({
                        height: '10em',
                        width: '10em',
                        padding: '0.5vh',
                        '-moz-box-shadow': '5px 5px 7px rgba(33,33,33,1)',
                        '-webkit-box-shadow': '5px 5px 7px rgba(33,33,33,.7)',
                        'box-shadow': '5px 5px 7px rgba(33,33,33,.7)'
                    }, 500, function() {});
                    stickerjson[i].toggle = false;
                    toggle = false;
                }
            }
            $(event.target).animate({
                height: '30em',
                width: '30em',
                padding: '1.5vh',
                '-moz-box-shadow': '15px 15px 21px rgba(33,33,33,1)',
                '-webkit-box-shadow': '15px 15px 21px rgba(33,33,33,.7)',
                'box-shadow': '15px 15px 21px rgba(33,33,33,.7)'
            }, 500, function() {});
            //console.log("true");
            toggle = true;
            currobj = { 'obj': event.target, 'toggle': toggle };
            stickerjson.push({ 'obj': event.target, 'toggle': true });
        } else {
            //if target div or ul, reset all sticker.

            if (target.is('div') || target.is('ul')) {
                for (var i = 0; i < stickerjson.length; i++) {
                    if (stickerjson[i].toggle == true) {
                        $(stickerjson[i].obj).animate({
                            height: '10em',
                            width: '10em',
                            padding: '0.5vh',
                            '-moz-box-shadow': '5px 5px 7px rgba(33,33,33,1)',
                            '-webkit-box-shadow': '5px 5px 7px rgba(33,33,33,.7)',
                            'box-shadow': '5px 5px 7px rgba(33,33,33,.7)'
                        }, 500, function() {});
                        stickerjson[i].toggle = false;
                        toggle = false;
                    }
                }
            }

        }

    });
});






//-------------------------------------------------------------------------------


$(document).ready(function() {
    $(this).click(function(event) {
        console.log(event.target);
        var RegPatTag=/tag\d{13}/; //click on sticker content,stickerpara, edit the tag..            css==>contains
        var RegPatSp=/stickerpara\d{13}/; //click on sticker content,stickerpara, edit the content   css==>contains
        var RegPatStId=/stickerId\d{13}/; //click on< a> ,blank area, create new sticker content      css==> a
        var RegPath2=/h\d{13}/;  //click on< h2> ,blank area, create new tag                          css==>h2
        var target = $(event.target);
        //edit tag or sticker content
        if(target.is('contains')){
        if ((String(event.target.id)).match(RegPatTag) == event.target.id) {
        }
         if ((String(event.target.id)).match(RegPatSp) == event.target.id) {}
        }

        //create new sticker content      css==> a
         if(target.is('a')){

         if ((String(event.target.id)).match(RegPatStId) == event.target.id) {
             // console.log("111");
             //problemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            $( "<hr /><contains class='stickerPara' id=stickerpara" + random13dig() + ">some note1</contains>" ).appendTo( ".dashboard ul li a");
         }
         }

        //create new tag                   css==>h2
         if(target.is('h2')){
         if ((String(event.target.id)).match(RegPath2) == event.target.id) {}
         }
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

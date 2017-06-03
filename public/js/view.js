var colorChoices = [

{'choice':'#e6c7e6'}, 
{'choice':'#c0d1d1'}, 
{'choice':'#e0e0db'}, 
{'choice':'#ddc0d1'}, 
{'choice':'#d1e4de'}, 
{'choice':'#e6e2e2'},
{'choice':'#adb9ca'},
{'choice':'#ffd965'},
{'choice':'#f781ab'},
    { 'choice': '#f7941e' },
    { 'choice': '#fcb040' },
    { 'choice': '#8cc63f' },
    { 'choice': '#13a89e' },
    { 'choice': '#46549e' },

    {'choice':'#d3cee2'}
];




var stickersData = [];

$(document).ready(function() {

    $(".dashboard").on("dblclick", function(event) {
        //alert("Your book is overdue.");
        var target = $(event.target);
        if (target.is('ul') || target.is('a') || target.is('li') || target.is('contains') || target.is('hr') || target.is('input') || target.is('button')) {
            return;
        }
        addNewSticker();
    });
});




function random13dig() {
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
    $(".dashboardUl").append("<li><a id=stickerId" + random13dig() + " href='#'><h2 id=h" + random13dig() + "><contains class='tag' id=tag" + random13dig() +
        ">tag1</contains> <contains class='tag' id=tag" + random13dig() + ">tag2</contains> </h2><hr /><contains class='stickerPara' id=stickerpara" + random13dig() +
        ">some note1</contains><hr /><contains class='stickerPara' id=stickerpara" + random13dig() + ">some note2</contains><hr /> </a></li>");
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
            if (target.css('height') > '15em') {
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

//Also can use 'closest' method to make it. 
var allElementsIdJson = [];

function getAllElementIdUnder(target) {
    var allElements = $(target).find('*');
    for (var i = 0; i < allElements.length; i++) {
        if (allElements[i].id != '')
            allElementsIdJson.push({ 'index': i, 'id': allElements[i].id });
    }
    return;
}
//get all element in <a>
//  getAllElementIdUnder(event.target);
//  console.log(allElementsIdJson);
//get last element, that is a para
//        var lastElementId = allElementsIdJson[allElementsIdJson.length - 1].id;
//add code.........................................
//reset allElementsIdJson
//         allElementsIdJson = [];
//---------------------------------------------------------------------------
var RegPatTag = /tag\d{13}/; //click on sticker content,stickerpara, edit the tag..            css==>contains
var RegPatSp = /stickerpara\d{13}/; //click on sticker content,stickerpara, edit the content   css==>contains
var RegPatStId = /stickerId\d{13}/; //click on< a> ,blank area, create new sticker content      css==> a
var RegPath2 = /h\d{13}/; //click on< h2> ,blank area, create new tag                          css==>h2
var RegInput = /inputContent\d{13}/;



$(document).ready(function() {
    $(this).click(function(event) {
        var target = $(event.target);
        var inputId;
        var inputContentText;
        // console.log(event.target);

        var target = $(event.target);
        //edit tag or sticker content
        if (target.is('contains')) {
            if ((String(event.target.id)).match(RegPatTag) == event.target.id) {}
            if ((String(event.target.id)).match(RegPatSp) == event.target.id) {}
        }



        var hasInputBox = false;

        //create new sticker content      css==> a
        if (target.is('a')) {
            if ((String(event.target.id)).match(RegPatStId) == event.target.id) {

                //            document.getElementById(event.target.id).innerHTML += "<hr /><contains class='stickerPara' id=stickerpara" + random13dig() + "> 1111</contains>"
                getAllElementIdUnder(event.target);



                for (var i = 0; i < allElementsIdJson.length; i++) {
                    // console.log(allElementsIdJson[i].id);
                    if ((String(allElementsIdJson[i].id)).match(RegInput) == allElementsIdJson[i].id) {
                        inputId = allElementsIdJson[i].id;
                        hasInputBox = true;
                    }
                }

                if (hasInputBox == true) {

                    if (target.is('input') == false) {
                        inputContentText = ($(":text").val());
                        $('#' + inputId).remove();
                        //         console.log(inputId);
                        if (inputContentText != '') {
                            document.getElementById(event.target.id).innerHTML += "<contains class='stickerPara' id=stickerpara" + random13dig() + "> " + inputContentText + "</contains><hr /> "
                        }
                        allElementsIdJson = [];
                        hasInputBox = false;
                        return;
                    }
                } else {
                    document.getElementById(event.target.id).innerHTML += " <input name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' placeholder='Add notes..'> "
                }
                allElementsIdJson = [];
            }

        }

        //create new tag                   css==>h2
        if (target.is('h2')) {
            if ((String(event.target.id)).match(RegPath2) == event.target.id) {}
        }


    });
});


//-------------------------------------------------------------------------------


//keyboard
//!!!!!    anywhere find page all ids
//!!!!!   console.log($.unique($('[id]').map(function() { return this.id; }).get()));  

//
//----------------------------------------------------------------------------------


//change color 

$(document).ready(function() {
    $(this).click(function(event) {
            var target = $(event.target);
            var allIds = $.unique($('[id]').map(function() {
                    return this.id; }).get())
                // console.log(event.target);
            if ((String(event.target.id)).match(/#\w+/) == event.target.id) {
               //console.log ((String(event.target.id)).match(/^color#\w+/));

               for (var i = 0; i < allIds.length; i++) {

                    if ($((String(allIds[i])).match(RegPatStId))[0] != {} && $((String(allIds[i])).match(RegPatStId))[0] != undefined) {
                       if (     ($('#' + $((String(allIds[i])).match(RegPatStId))[0]).css('height') > '15em')    ) {
                        //   console.log( (event.target.id));
                            ($('#' + $((String(allIds[i])).match(RegPatStId))[0])).css("background-color", event.target.id);

                       }

                    }

                }
            }
        

    });
});



$(window).load(function() {
    $(".btn-nav").on("click tap", function() {
        $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
    addNewSticker();
    for (var i = 0; i < colorChoices.length; i++) {
        $(".nav-list").append("<li class='list-item'  style='background-color:" + colorChoices[i].choice + "'><a id=" + colorChoices[i].choice + "></a></li>");
    }
});

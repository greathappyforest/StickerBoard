var colorChoices = [

    { 'choice': '#e6c7e6' },
    { 'choice': '#c0d1d1' },
    { 'choice': '#e0e0db' },
    { 'choice': '#ddc0d1' },
    { 'choice': '#d1e4de' },
    { 'choice': '#e6e2e2' },
    { 'choice': '#adb9ca' },
    { 'choice': '#ffd965' },
    { 'choice': '#f781ab' },
    { 'choice': '#f7941e' },
    { 'choice': '#fcb040' },
    { 'choice': '#8cc63f' },
    { 'choice': '#13a89e' },
    { 'choice': '#46549e' },
    { 'choice': '#d3cee2' }
];



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

    $(".dashboardUl").append("<li><a  id=stickerId" + random13dig() + " ><h2 id=h" + random13dig() + "><contains class='tag' id=tag" + random13dig() +
        ">tag1</contains> <contains class='tag' id=tag" + random13dig() + ">tag2</contains> </h2><hr color=#000000 /><contains class='stickerPara' id=stickerpara" + random13dig() +
        ">some note1</contains><hr /><contains class='stickerPara' id=stickerpara" + random13dig() + ">some note2</contains><hr />     <contains class='close'> </contains>    </a></li>");


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



//---------------------------------------------------------------------------
var RegTag = /tag\d{13}/; //click on sticker content,stickerpara, edit the tag..            css==>contains
var RegSp = /stickerpara\d{13}/; //click on sticker content,stickerpara, edit the content   css==>contains
var RegStId = /stickerId\d{13}/; //click on< a> ,blank area, create new sticker content      css==> a
var RegH2 = /h\d{13}/; //click on< h2> ,blank area, create new tag                          css==>h2
var RegInput = /inputContent\d{13}/;




$(document).ready(function() {
    $(this).click(function(event) {
        var target = $(event.target);
        var inputId;
        var aId = [];
        var H2Id = [];
        var tagId = [];
        var contentId = [];

        var inputContentText = ($(":text").val());
        var allIds = $.unique($('[id]').map(function() {
                return this.id;
            }).get())
            // console.log(event.target);
            // $('#'+$((String(allIds[i])).match(RegInput))[0])  -------obj
        for (var i = 0; i < allIds.length; i++) {
            if ($((String(allIds[i])).match(RegInput))[0] != undefined) {
                inputId = $((String(allIds[i])).match(RegInput))[0];
            }
            if ($((String(allIds[i])).match(RegStId))[0] != undefined) {
                aId.push($((String(allIds[i])).match(RegStId))[0]);
            }
            if ($((String(allIds[i])).match(RegH2))[0] != undefined) {
                H2Id.push($((String(allIds[i])).match(RegH2))[0]);
            }
            if ($((String(allIds[i])).match(RegTag))[0] != undefined) {
                tagId.push($((String(allIds[i])).match(RegTag))[0]);
            }
            if ($((String(allIds[i])).match(RegSp))[0] != undefined) {
                contentId.push($((String(allIds[i])).match(RegSp))[0]);
            }
        }
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//         // console.log('inputId',inputId);
//         // console.log('aId',aId);
//         // console.log('H2Id',H2Id);
//         // console.log('tagId',tagId);
//         // console.log('contentId',contentId);
//         var tagobj=$($($('#'+aId).children())[0]).children();
//        // console.log(       $($($($('#'+aId).children())[0]).children()[0]).text()             );
//       //  console.log(       $( $($('#'+aId[0]).children()[0]).children()[1]).text()     );
//       //  console.log(      tagobj.length             );

// stickersData=[];
//     //loop for each note
//     for(var i=0; i<aId.length ;i++){
//        //loop for tagobj
//         TagData=[];
//         contentData=[];

//         //get each stickynote obj tag text info
//          var tagobj=$($('#'+aId[i]).children()[0]).children();
//          for(var j=0; j<tagobj.length; j++ ){
//            TagData.push( $(tagobj[j]).text()   );
//          }

//          //get each stickynote obj content text info
//          var noteContentObj= $($('#'+aId[i]).children())
//          var contentobj= findNotecontentobj(noteContentObj);
//          for(var k=0; k<contentobj.length; k++){
//             contentData.push (   $(contentobj[k]).text()       );

//          }   

//          //position, top     
//        $('#'+aId[i]).position().top;      

//         // position,left
//         $('#'+aId[i]).position().left;

//         //bgcolor
//        $('#'+aId[i]).css("background-color")       
//          //  console.log(TagData);
//          // console.log(contentData);

//          stickersData.push({ 
//          Tag: TagData,
//         content: contentData,
//         'top':  $('#'+aId[i]).position().top,
//         'left': $('#'+aId[i]).position().left,
//         'bgcolor': $('#'+aId[i]).css("background-color") 
//         })
         
//      }

//   // console.log(stickersData);
//  //  console.log(stickersData);
//  // console.log( JSON.stringify(stickersData)  );



//         function findNotecontentobj(noteContentObj){
//             var temp=[];
//             for(var i=0; i<noteContentObj.length; i++){
//                 if(  $(noteContentObj[i]).is('contains')  )
//                     if(! $(noteContentObj[i]).is('.close')     )
//                     temp.push(noteContentObj[i]);
//             }
//             return temp;
//         }
// $.post("users", {Data:JSON.stringify(stickersData)});

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------


        //    console.log(event.target.id);
        if (event.target.id == "addnote") {
            addNewSticker();
        }

        if (target.is('.close')) {
            target.parent().parent().remove()
        }




        if (target.parents('ul.nav-list').length == 0) {
            if (target.is('input')) {
                return;
            } else if ((target.is('a') || target.is('h2')) && (inputId == undefined)) {
                if (target.css('height') > '15em') {
                    if (target.is('a')) {
                        target.find(".close").toggle();
                        document.getElementById(event.target.id).innerHTML += " <hr /><input style='width: 25em;' name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' placeholder='Add notes..'> "
                    }
                    if (target.is('h2')) {
                        document.getElementById(event.target.id).innerHTML += " <input style='width: 5em;'  name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' placeholder='Add Tag..'value=> "
                    }
                }
            } else if ((target.is('contains')) && (inputId == undefined)) {
                if ((String(event.target.id)).match(RegTag) == event.target.id) {
                    var tagContent = $(event.target).text();
                    //    console.log('tagContent:', tagContent);
                    $(event.target).replaceWith(" <input style='width: 5em;'  name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' value='" + tagContent + "''> ");

                }
                if ((String(event.target.id)).match(RegSp) == event.target.id) {
                    var noteContent = $(event.target).text();
                    $(event.target).replaceWith(" <input style='width: 25em;'  name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' value='" + noteContent + "''> ");
                }
            } else {
                var dad = $('#' + inputId).parent();
                if (inputContentText == '') {

                    if (dad.is('a')) {
                        $('#' + inputId).prev().remove();
                        $('#' + inputId).remove();
                    }
                    if (dad.is('h2')) {
                        $('#' + inputId).remove();
                    }
                } else {
                    if (dad.is('a')) {
                        $('#' + inputId).replaceWith("<contains class='stickerPara' id=stickerpara" + random13dig() + "> " + inputContentText + "</contains> ");

            //            contentData.push(inputContentText);
                  
                    }
                    if (dad.is('h2')) {
                        //  console.log('inputContentText:', inputContentText);
                        $('#' + inputId).replaceWith("<contains class='tag' id=tag" + random13dig() + "> " + inputContentText + " </contains> ");
                    }
                }

            }
        }

   //      noteObjData={'tag':'[]','content':contentData}
   // console.log(noteObjData);

    });
});



//-------------------------------------------------------------------------------


//keyboard
//!!!!!    anywhere find page all ids
//!!!!!   console.log($.unique($('[id]').map(function() { return this.id; }).get()));  



var str = '';
$(document).ready(function() {
    $('body').keypress(function(event) {
        var inputId;
        var aId = [];
        var H2Id = [];
        var tagId = [];
        var contentId = [];


        var inputContentText = ($(":text").val());
        var allIds = $.unique($('[id]').map(function() {
                return this.id;
            }).get())
            // console.log(event.target);
            // $('#'+$((String(allIds[i])).match(RegInput))[0])  -------obj
        for (var i = 0; i < allIds.length; i++) {

            if ($((String(allIds[i])).match(RegInput))[0] != undefined) {
                inputId = $((String(allIds[i])).match(RegInput))[0];
            }
            if ($((String(allIds[i])).match(RegStId))[0] != undefined) {
                aId.push($((String(allIds[i])).match(RegStId))[0]);
            }
            if ($((String(allIds[i])).match(RegH2))[0] != undefined) {
                H2Id.push($((String(allIds[i])).match(RegH2))[0]);
            }
            if ($((String(allIds[i])).match(RegTag))[0] != undefined) {
                tagId.push($((String(allIds[i])).match(RegTag))[0]);
            }
            if ($((String(allIds[i])).match(RegSp))[0] != undefined) {
                contentId.push($((String(allIds[i])).match(RegSp))[0]);
            }
        }


        if ((event.which == 13)) {
            if ((inputId != undefined)) {
                var dad = $('#' + inputId).parent();
                if (inputContentText == '') {

                    if (dad.is('a')) {
                        $('#' + inputId).prev().remove();
                        $('#' + inputId).remove();
                    }
                    if (dad.is('h2')) {
                        $('#' + inputId).remove();
                    }
                } else {
                    var dad = $('#' + inputId).parent();
                    if (dad.is('a')) {
                        $('#' + inputId).replaceWith("<contains class='stickerPara' id=stickerpara" + random13dig() + "> " + inputContentText + "</contains> ");
                    }
                    if (dad.is('h2')) {
                        //     console.log('inputContentText:',inputContentText);
                        $('#' + inputId).replaceWith("<contains class='tag' id=tag" + random13dig() + "> " + inputContentText + " </contains> ");
                    }
                }
            } else {
                for (var i = 0; i < aId.length; i++) {
                    console.log(aId[i]);
                    if ($('#' + aId[i]).css('height') > '15em')
                        document.getElementById(aId[i]).innerHTML += " <hr /><input style='width: 25em;' name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' placeholder='Add notes..'> "
                }

            }
        } else {
            //no focus on input any key also can input...
            if ((inputId != undefined)) {
                var key = String.fromCharCode(event.which);
                $('#' + inputId).replaceWith(" <input style='width: 25em;'  name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' value='" + ($(":text").val()).concat(key) + "''> ");
            }

        }

    });
});


var str2 = '';
$(document).keydown(function(e) {
    var inputId;
    var aId = [];
    var H2Id = [];
    var tagId = [];
    var contentId = [];


    var inputContentText = ($(":text").val());
    var allIds = $.unique($('[id]').map(function() {
            return this.id;
        }).get())
        // console.log(event.target);
        // $('#'+$((String(allIds[i])).match(RegInput))[0])  -------obj
    for (var i = 0; i < allIds.length; i++) {

        if ($((String(allIds[i])).match(RegInput))[0] != undefined) {
            inputId = $((String(allIds[i])).match(RegInput))[0];
        }
        if ($((String(allIds[i])).match(RegStId))[0] != undefined) {
            aId.push($((String(allIds[i])).match(RegStId))[0]);
        }
        if ($((String(allIds[i])).match(RegH2))[0] != undefined) {
            H2Id.push($((String(allIds[i])).match(RegH2))[0]);
        }
        if ($((String(allIds[i])).match(RegTag))[0] != undefined) {
            tagId.push($((String(allIds[i])).match(RegTag))[0]);
        }
        if ($((String(allIds[i])).match(RegSp))[0] != undefined) {
            contentId.push($((String(allIds[i])).match(RegSp))[0]);
        }
    }


    if ((inputId != undefined)) {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            $('#' + inputId).prev().remove();
            $('#' + inputId).remove();
        }

        if (e.keyCode == 8) {

            $('#' + inputId).replaceWith(" <input style='width: 25em;'  name='contentInput' class= '.contains input' id=inputContent" + random13dig() + "    type='text' value='" + ($(":text").val()).slice(0, str.length - 1) + "''> ");

        }
    }
});





//----------------------------------------------------------------------------------


//change color 

$(document).ready(function() {
    $(this).click(function(event) {
        var target = $(event.target);
        var allIds = $.unique($('[id]').map(function() {
                return this.id;
            }).get())
            // console.log(event.target);
        if ((String(event.target.id)).match(/#\w+/) == event.target.id) {
            //console.log ((String(event.target.id)).match(/^color#\w+/));
            for (var i = 0; i < allIds.length; i++) {
                if ($((String(allIds[i])).match(RegStId))[0] != {} && $((String(allIds[i])).match(RegStId))[0] != undefined) {
                    if (($('#' + $((String(allIds[i])).match(RegStId))[0]).css('height') > '15em')) {
                        //   console.log( (event.target.id));
                        ($('#' + $((String(allIds[i])).match(RegStId))[0])).css("background-color", event.target.id);
                    }

                }

            }
        }

    });
});


//------------------------unload event------------------------------


$(document).ready(function() {
     $(window).unload(function() {


var stickersData = [];
var noteObjData={};
var TagData=[];
var contentData=[];

       var aId = [];
        var H2Id = [];
        var tagId = [];
        var contentId = [];

        var inputContentText = ($(":text").val());
        var allIds = $.unique($('[id]').map(function() {
                return this.id;
            }).get())
            // console.log(event.target);
            // $('#'+$((String(allIds[i])).match(RegInput))[0])  -------obj
        for (var i = 0; i < allIds.length; i++) {
            if ($((String(allIds[i])).match(RegInput))[0] != undefined) {
                inputId = $((String(allIds[i])).match(RegInput))[0];
            }
            if ($((String(allIds[i])).match(RegStId))[0] != undefined) {
                aId.push($((String(allIds[i])).match(RegStId))[0]);
            }
            if ($((String(allIds[i])).match(RegH2))[0] != undefined) {
                H2Id.push($((String(allIds[i])).match(RegH2))[0]);
            }
            if ($((String(allIds[i])).match(RegTag))[0] != undefined) {
                tagId.push($((String(allIds[i])).match(RegTag))[0]);
            }
            if ($((String(allIds[i])).match(RegSp))[0] != undefined) {
                contentId.push($((String(allIds[i])).match(RegSp))[0]);
            }
        }

         function findNotecontentobj(noteContentObj){
            var temp=[];
            for(var i=0; i<noteContentObj.length; i++){
                if(  $(noteContentObj[i]).is('contains')  )
                    if(! $(noteContentObj[i]).is('.close')     )
                    temp.push(noteContentObj[i]);
            }
            return temp;
        }




        var tagobj=$($($('#'+aId).children())[0]).children();


        stickersData=[];
         //loop for each note
         for(var i=0; i<aId.length ;i++){
       //loop for tagobj
        TagData=[];
        contentData=[];

        //get each stickynote obj tag text info
         var tagobj=$($('#'+aId[i]).children()[0]).children();
         for(var j=0; j<tagobj.length; j++ ){
           TagData.push( $(tagobj[j]).text()   );
         }

         //get each stickynote obj content text info
         var noteContentObj= $($('#'+aId[i]).children())
         var contentobj= findNotecontentobj(noteContentObj);
         for(var k=0; k<contentobj.length; k++){
            contentData.push (   $(contentobj[k]).text()       );

         }   

         //position, top     
       $('#'+aId[i]).position().top;      

        // position,left
        $('#'+aId[i]).position().left;

        //bgcolor
       $('#'+aId[i]).css("background-color")       
         //  console.log(TagData);
         // console.log(contentData);

         stickersData.push({ 
        'username': $(localuser).text(),
         tag: TagData,
        content: contentData,
        'top':  $('#'+aId[i]).position().top,
        'left': $('#'+aId[i]).position().left,
        'bgcolor': $('#'+aId[i]).css("background-color") 
        })
        
     }

//------------------$.post("users", {Data:JSON.stringify(stickersData)});


 $.ajax({
    type: 'POST',
    async: false,
    url: 'users',
    data: {Data:JSON.stringify(stickersData)}
});


});
});



//-----------------------------------------------------------------------------



$(window).load(function() {
    $(".btn-nav").on("click tap", function() {
        $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
   // addNewSticker();
    for (var i = 0; i < colorChoices.length; i++) {
        $(".nav-list").append("<li class='list-item'  style='background-color:" + colorChoices[i].choice + "'><a id=" + colorChoices[i].choice + "></a></li>");
    }


  // $(".dashboardUl").append("<li><a  id=stickerId" + random13dig() + " ><h2 id=h" + random13dig() + "><contains class='tag' id=tag" + random13dig() +
  //       ">tag1</contains> <contains class='tag' id=tag" + random13dig() + ">tag2</contains> </h2><hr color=#000000 /><contains class='stickerPara' id=stickerpara" + random13dig() +
  //       ">some note1</contains><hr /><contains class='stickerPara' id=stickerpara" + random13dig() + ">some note2</contains><hr />     <contains class='close'> </contains>    </a></li>");



  //$(".dashboardUl").append("<% usersdata.forEach(function(userdata){ %> <li> <%= userdata.tag %></li> <% })%>");


});


$(document).ready(function() {
    $(document).bind("contextmenu", function(e) {
        return false;
    });
});




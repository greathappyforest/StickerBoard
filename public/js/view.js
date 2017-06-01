var sections = $('section'),
    nav = $('nav'),
    nav_height = nav.outerHeight();

$(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop();

    sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });
});



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




$(window).load(function() {
    $(".btn-nav").on("click tap", function() {
        $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });

        for (var i = 0; i < 12; i++) {
        $(".nav-list").append("<li class='list-item' style='background-color:" +colorChoices[i].choice+  "'><a></a></li>");
    }

});




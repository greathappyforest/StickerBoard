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

nav.find('a').on('click', function() {
    var $el = $(this),
        id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);

    return false;
});




$(window).load(function() {
    $(".btn-nav").on("click tap", function() {
        $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
});



$(window).load(function() {
    $("html body").css("background-color", "#768888");
});

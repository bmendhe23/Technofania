// reload on brower resize 

jQuery(function($) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    $(window).resize(function() {
        if(windowWidth != $(window).width() || windowHeight != $(window).height()) {
            location.reload();
            return;
        }
    });
});

// reload on browser resize end
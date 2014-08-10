(function( $ ) {
  $.fn.activeScroll = function(options) {
    var settings = $.extend({
      class: "active",
      nav: "nav",
      navEl: "li",
      sections: "section",
      threshold: 0,
    }, options);

    $scroll = $(this);
    $sections = $scroll.find(settings.sections);

    $(window).scroll(function() {
      var windScroll = $(window).scrollTop();
      $sections.each(function(section) {
        if ($(this).position().top <= windScroll - settings.threshold) {
          var navElSelector = settings.nav + " " + settings.navEl;
          $(navElSelector + "." + settings.class).removeClass(settings.class);
          $(navElSelector).eq(section).addClass(settings.class);
        }
      });
    }).scroll();
  };
}( jQuery ));

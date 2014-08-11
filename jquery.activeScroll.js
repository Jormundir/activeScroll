(function( $ ) {
  $.fn.activeScroll = function(options) {
    var settings = $.extend({
      animation: 200,
      class: "active",
      nav: "nav",
      navItem: "li",
      navLink: "a",
      sections: "section",
      threshold: -10,
    }, options);

    var $sections = $(this).find(settings.sections);
    var navItemSelector = settings.nav + " " + settings.navItem;
    var navLinkSelector = navItemSelector + " " + settings.navLink;
    var statePushed = false;

    // Init navagation links to animated scroll to sections
    $sections.each(function(i) {
      var $section = $sections.eq(i);
      var $link = $(navLinkSelector).eq(i);
      if ($link) {
        $link.click(function(e) {
          var href = $(this).attr("href");
          var isHash = href && href[0] === "#";
          var isVoid = href && href === "javascript:void(0)";
          if (isHash || isVoid) {
            event.preventDefault();

            if (isHash && window.history.pushState) {
              var newHash = window.location.hash.replace(window.location.hash, href);
              statePushed ?
                window.history.replaceState({}, "", newHash) :
                window.history.pushState({}, "", newHash);
              statePushed = true;
            }

            $("html, body").animate({
              scrollTop: $section.position().top + (settings.threshold + 1),
            });
          }
        });
      }
    });

    // Change navagation item classes when scrolling into new section
    $(window).scroll(function() {
      var windScroll = $(window).scrollTop();
      $sections.each(function(i) {
        if ($(this).position().top <= windScroll - settings.threshold) {
          $(navItemSelector + "." + settings.class).removeClass(settings.class);
          $(navLinkSelector).eq(i).closest(navItemSelector).addClass(settings.class);
        }
      });
    }).scroll();
  };
}( jQuery ));

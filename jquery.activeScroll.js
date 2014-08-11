(function( $ ) {
  $.fn.activeScroll = function(options) {
    var settings = $.extend({
      animation: 200,
      class: "active",
      nav: "nav",
      navItem: "li",
      navLink: "a",
      sections: "section",
      sectionIdAttr: "id",
      threshold: -10
    }, options);

    var navItemSelector = settings.nav + " " + settings.navItem;
    var navLinkSelector = navItemSelector + " " + settings.navLink;
    var statePushed = false;

    // Init navigation links so they animatedly scroll to sections
    var $sections = $(this).find(settings.sections).filter(function() {
      var $section = $(this);
      var id = $section.attr(settings.sectionIdAttr);

      if (!id)
        return false;

      var idStr = "#" + id;
      var $link = $(navLinkSelector + "[href='" + idStr + "']");

      if (!$link)
        return false;

      $link.click(function(e) {
        e.preventDefault();

        if (window.history.pushState) {
          var newLoc = window.location.hash.replace(window.location.hash, idStr);
          statePushed ?
            window.history.replaceState({}, "", newLoc) :
            window.history.pushState({}, "", newLoc);
          statePushed = true;
        }

        $("html, body").animate({
          scrollTop: $section.position().top + (settings.threshold + 1)
        });
      });

      $(this).prop("$link", $link);
      return true;
    });

    // Change navigation item classes when scrolling into new section
    $(window).scroll(function() {
      var windScroll = $(window).scrollTop();
      $sections.each(function() {
        if ($(this).position().top <= windScroll - settings.threshold) {
          $(navItemSelector + "." + settings.class).removeClass(settings.class);
          $(this).prop("$link").closest(navItemSelector).addClass(settings.class);
        }
      });
    }).scroll();
  };
}( jQuery ));

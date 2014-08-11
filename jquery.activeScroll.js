/*
 The MIT License (MIT)

 Copyright (c) 2014 Charles Bryan

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

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

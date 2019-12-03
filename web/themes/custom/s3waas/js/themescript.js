(function($, Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function(context, settings) {
      $("ul.menu").first().once().wrap('<div id="cssmenu"></div>');

      $('.region-topbar').append('<a href="#" title="Back To Top" class="scrollToTop" style="display: none;"><i class="fa fa-angle-up"></i></a>');

      $("#cssmenu").menumaker({ title: "Menu", format: "multitoggle" });

      $(window).scroll(function() {
        if ($(this).scrollTop()) {
          $('.scrollToTop').fadeIn();
        } else {
          $('.scrollToTop').fadeOut();
        }
      });

      $('.scrollToTop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, "slow");
      });
      $('.home-slider').flexslider({
        animation: ($('body').hasClass('rtl')) ? "fade" : "slide",
        directionNav: true,
        prevText: "<span class='hide'>Previous</span>",
        nextText: "<span class='hide'>Next</span>",
        pausePlay: true,
        pauseText: "<span class='hide'>Pause</span>",
        playText: "<span class='hide'>Play</span>",
        controlNav: false,
        start: function(slider) {
          $('body').find('.flexslider').resize();
          if (slider.count == 1) {
            slider.pausePlay.parent().remove();
          }
        }
      });
      $('.footer').once().before('<img src="/themes/custom/s3waas/images/footer-background.gif" alt="Biswa Bangla" width="100%">');
    }
  };
})(jQuery, Drupal);

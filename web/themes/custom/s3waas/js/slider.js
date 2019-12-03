(function ($, Drupal) {
  Drupal.behaviors.slider = {
    attach: function (context, settings) {
      $('.home-slider', context).flexslider({
        animation: ($('body').hasClass('rtl')) ? "fade" : "slide",
        directionNav: true,
        prevText: "<span class='hide'>Previous</span>",
        nextText: "<span class='hide'>Next</span>",
        pausePlay: true,
        pauseText: "<span class='hide'>Pause</span>",
        playText: "<span class='hide'>Play</span>",
        controlNav: false,
        start: function (slider) {
          $('body').find('.flexslider').resize();
          if (slider.count == 1) {
            slider.pausePlay.parent().remove();
          }
        }
      });
    }
  };
})(jQuery, Drupal);
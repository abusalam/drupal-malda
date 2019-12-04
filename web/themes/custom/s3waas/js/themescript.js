(function($, Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function(context, settings) {
      console.log(settings);
      $("ul.menu", context).first().once().wrap('<div id="cssmenu"></div>');
      $("#cssmenu").menumaker({ title: "Menu", format: "multitoggle" });

      $(window).scroll(function() {
        if ($(this).scrollTop()) {
          $('.scrollToTop').fadeIn();
        } else {
          $('.scrollToTop').fadeOut();
        }
      });

      $('.region-topbar').append('<a href="#" title="Back To Top" class="scrollToTop" style="display: none;"><i class="fa fa-angle-up"></i></a>');
      $('.scrollToTop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, "slow");
      });

      $('.footer').once().before('<img src="/themes/custom/s3waas/images/footer-background.gif" alt="Biswa Bangla" width="100%">');

      $('.contrast').click(function() {
        var code = this.id;
        if (code == 'dark') {
          $('head').append('<link href="/themes/custom/s3waas/css/base/contrast.css" rel="stylesheet" id="newcss" title="contrast" />');
        } else if (code == 'light') {
          $('link[href="/themes/custom/s3waas/css/base/contrast.css"]').remove();
        } else {
          return false;
        }
      });

    }
  };
})(jQuery, Drupal);

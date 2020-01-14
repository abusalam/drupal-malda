(function($, Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function(context, settings) {
      console.log(settings);

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

      // $('.footer').once().before('<img src="/themes/custom/s3waas/images/footer-background.gif" class="footer-bg" alt="Biswa Bangla" width="100%">');

      $('.contrast').click(function() {
        var code = this.id;
        setStyle(code);
      });

      var style = getCookie("style");
      setStyle(style);

      function setStyle(code) {
        if (code == 'dark') {
          setCookie("style", code, 30);
          $('head').append('<link href="/themes/custom/s3waas/css/base/contrast.css" rel="stylesheet" id="newcss" title="contrast" />');
        } else if (code == 'light') {
          setCookie("style", code, 30);
          $('link[href="/themes/custom/s3waas/css/base/contrast.css"]').remove();
        } else {
          return false;
        }
      }

      function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

      function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      var click = false;
      $('#searchBar').click(function() {
        if (click) {
          click = false;
          $('div#block-searchform form#search-block-form').hide();
        } else {
          click = true;
          $('div#block-searchform form#search-block-form').show();
        }
      });

      $('#searchBar').focus(function(e) {
        click = true;
        $('div#block-searchform form#search-block-form').show();
      });
      $('#searchBar').keydown(function(e) {
        click = false;
        $('div#block-searchform form#search-block-form').hide();
      });


      $('#block-searchform').wrap('<div class="container"></div>');

      $('.font-size').click(function() {
        var code = this.id;
        var fontSize = parseInt($(".slide-caption").css("font-size"));
        if (code == 'normal') {
          $('.slide-caption, .layout-main ').attr("style", 'font-size: 14px');
        } else if (code == 'increase') {
          fontSize = fontSize + 1;
          if (fontSize < 21) {
            $('.slide-caption, .layout-main ').attr("style", 'font-size: ' + fontSize + 'px');
          } else {
            return false;
          }
        } else if (code == 'decrease') {
          fontSize = fontSize - 1;
          if (fontSize > 9) {
            $('.slide-caption, .layout-main ').attr("style", 'font-size: ' + fontSize + 'px');
          } else {
            return false;
          }
        }
      });
      var clickMenu = true;
      $('.menu-icon').click(
        function() {
          if (clickMenu) {
            clickMenu = false;
            $('#superfish-main-accordion').removeClass('sf-hidden').addClass('sf-expanded').attr('style', 'display:block').show('slow');
          } else {
            clickMenu = true;
            $('#superfish-main-accordion').removeClass('sf-expanded').addClass('sf-hidden').attr('style', 'display:block').hide('slow');
          }

        });

      // $('#edit-keys').attr('placeholder', "Search.");
      $('.form-type-search').append('<button type="submit" class=" btn search_submit_s3waas"><i class="fa fa-search"></i></button>');

    }
  };
})(jQuery, Drupal);

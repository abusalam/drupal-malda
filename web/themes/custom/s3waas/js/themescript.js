$("ul.menu").first().wrap('<div id="cssmenu"></div>');
$('.region-topbar').append('<a href="#" title="Back To Top" class="scrollToTop" style="display: none;"><i class="fa fa-angle-up"></i></a>');

$("#cssmenu").menumaker({
  title: "Menu",
  format: "multitoggle"
});

$(window).scroll(function() {
  if ($(this).scrollTop()) {
    $('.scrollToTop').fadeIn();
  } else {
    $('.scrollToTop').fadeOut();
  }
});

$('.scrollToTop').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});

$('.footer').before(' <img src="https://sumantablog.github.io/drupal-malda/static/images/footer_top_bg.gif" alt="Biswa Bangla" width="100%">');
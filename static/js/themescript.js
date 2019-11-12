
function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
            jQuery(document).ready(function ($) {
                // Slider

                $('.home-slider').flexslider({
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
            });

            if (!String.prototype.startsWith) {
                String.prototype.startsWith = function (searchString, position) {
                    position = position || 0;
                    return this.indexOf(searchString, position) === position;
                };
            }
            jQuery(document).ready(function ($) {

                jQuery('[data-vc-tabs]').click(function () {
                    jQuery(this).parent().siblings().find('a').attr('aria-selected', false);
                    jQuery(this).attr('aria-selected', true);
                });
                jQuery('body').on('targetExternalLinks', function () {

                    var isExternal = function (url) {
                        return !(location.href.replace("http://", "").replace("https://", "").split("/")[0] === url.replace("http://", "").replace("https://", "").split("/")[0]);
                    }
                    jQuery('a').each(function () {
                        var href = jQuery(this).attr('href');
                        if (typeof href == 'undefined') {
                            jQuery(this).attr('href', 'javascript:void(0)');
                            href = '#';
                        }

                        if ($(this).attr('hreflang') !== undefined) {
                            if (jQuery(this).attr('aria-label') !== typeof undefined) {
                                jQuery(this).attr('aria-label', jQuery(this).text()).attr('title', jQuery(this).text());
                            }
                        } else if (isExternal(href)) {

                            if (href != 'javascript:void(0);'
                                    && !href.match("/^\/[a-z0-9]+jQuery/i")
                                    && href != '#' && href != '/' && href != ''
                                    && !href.startsWith("#")
                                    && href.indexOf('.') !== -1
                                    && !jQuery(this).hasClass('fancybox.iframe')
                                    && !jQuery(this).hasClass('fancybox')
                                    ) {
                                if (href.indexOf('cdn.s3waas.gov.in') == -1 && href.indexOf('auth.s3waas.gov.in') == -1) {
                                    if (typeof jQuery(this).attr('onclick') === "undefined") {
                                        jQuery(this).attr("onclick", "return confirm('You are being redirected to an external website. Please note that S3WaaS cannot be held responsible for external websites content & privacy policies.');");
                                    }
                                }
                                if (typeof jQuery(this).attr('aria-label') === "undefined" || typeof jQuery(this).attr('title') === "undefined") {
                                    var text = '';
                                    if (jQuery(this).text().trim() !== '') {
                                        text = jQuery(this).text().trim() + ' - ';
                                    } else {
                                        text = jQuery(this).attr('href') + ' - ';
                                    }

                                    if (href.indexOf('cdn.s3waas.gov.in') == -1 && href.indexOf('auth.s3waas.gov.in') == -1) {

                                        if (typeof jQuery(this).attr('aria-label') === "undefined") {
                                            jQuery(this).attr('aria-label', text + 'External site that opens in a new window');
                                        }
                                        if (typeof jQuery(this).attr('title') === "undefined") {
                                            jQuery(this).attr('title', text + 'External site that opens in a new window');
                                        }

                                    }
                                }

                            }
                        }
                    });
                })

                $('.flex-direction-nav a.flex-prev').attr({'title': 'Previous', 'aria-label': 'Previous'});
                $('.flex-pauseplay a.flex-pause').attr({'title': 'Play/Pause', 'aria-label': 'Play/Pause'});
                $('.flex-direction-nav a.flex-next').attr({'title': 'Next', 'aria-label': 'Next'});
                $('a[download]').each(function () {

                    var ariaLabel = $(this).prev().attr('aria-label').split('-')[0];
                    ariaLabel = 'Download ' + ariaLabel;
                    $(this).attr('aria-label', ariaLabel).removeAttr('aria-hidden');
                });
            });

                  jQuery(document).ready(function () {
                      jQuery("#footerScrollbar").flexslider({
                          animation: "slide",
                          animationLoop: true,
                          itemWidth: 201,
                          minItems: 2,
                          slideshow: 1,
                          move: 1,
                          controlNav: false,
                          pausePlay: true,
                          prevText: "<span class='hide'>Previous</span>",
                          nextText: "<span class='hide'>Next</span>",
                          pauseText: "<span class='hide'>Pause</span>",
                          playText: "<span class='hide'>Play</span>",
                      })
                  });


                  $("#cssmenu").menumaker({
                    title: "Menu",
                    format: "multitoggle"
                  });



window.onscroll = function() {myFunction()};

var header = document.getElementById("header");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

$(window).scroll(function() {
  if ($(this).scrollTop()) {
      $('.scrollToTop').fadeIn();
  } else {
      $('.scrollToTop').fadeOut();
  }
});

$('.scrollToTop').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

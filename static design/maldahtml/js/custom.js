jQuery.noConflict();
(function( jQuery ) {
function _set_font_size(e) {
    "increase" == e ? parseInt(fontSize) < 18 && (fontSize = parseInt(fontSize) + 2) : "decrease" == e ? parseInt(fontSize) > 10 && (fontSize = parseInt(fontSize) - 2) : fontSize = 14, _setCookie("fontSize", fontSize), jQuery("body").css("font-size", fontSize + "px")
}

function _getCookie(e) {
    for (var t = e + "=", i = t.length, o = document.cookie.length, n = 0; o > n;) {
        var a = n + i;
        if (document.cookie.substring(n, a) == t) return _getCookieVal(a);
        if (n = document.cookie.indexOf(" ", n) + 1, 0 == n) break
    }
    return null
}

function _deleteCookie(e, t, i) {
    _getCookie(e) && (document.cookie = e + "=" + (t ? "; path=" + t : "") + (i ? "; domain=" + i : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT")
}

function _setCookie(e, t, i, o, n, a) {
    var s = !0;
    "" != o && void 0 != o && (s = validUrl(o)), "string" == jQuery.type(e) && s && (document.cookie = e + "=" + escape(t) + (i ? "; expires=" + i.toGMTString() : "") + (o ? "; path=" + o : "") + (n ? "; domain=" + n : "") + (a ? "; secure" : ""))
}

function _getCookieVal(e) {
    var t = document.cookie.indexOf(";", e);
    return -1 == t && (t = document.cookie.length), unescape(document.cookie.substring(e, t))
}

function printbody() {
    window.print()
}

//Keyboard accessing functions
function addFocusClass() {

    jQuery('#accessibility').find('li').each(function(index, element) {
        jQuery(this).children('a').focus(function(e) {

            jQuery(this).parent('li').addClass('mFocus');
        });
    });
    jQuery('#accessibilityMenu>li>a').focusin(function(e) {
        jQuery('#accessibilityMenu').find('li').each(function(index, element) {
            jQuery(this).removeClass('mFocus');
        });
        jQuery(this).addClass('mFocus');

    });

    jQuery("#accessibilityMenu>li:last-child ul li:last-child").focusout(function(e) {
        jQuery("#accessibilityMenu>li:last-child").removeClass("mFocus")
    });

    jQuery('#accessibilityMenu>li>a').click(function(e) {
        jQuery(this).addClass('focus');
        jQuery(this).next('ul').addClass('visible');

    });

jQuery('html').click(function(e){
    if (e.target.id == 'accessibilityMenu' || jQuery(e.target).parents('#accessibilityMenu').length > 0) {
    } else {
        jQuery('.goiSearch').removeClass('visible');
        jQuery('#accessibilityMenu>li').each(function(index, element) {
                jQuery(this).removeClass('mFocus');
                jQuery(this).children('a').removeClass('focus');
            });
    }
});

}
if (null != _getCookie("fontSize")) {
    var fontSize = _getCookie("fontSize");
    jQuery("body").css("font-size", fontSize + "px")
} else {
    var fs = jQuery("body").css("font-size"),
        fontSize = fs;
    jQuery("body").css("font-size", fs)
}
jQuery(document).ready(function(e) {
   /*jQuery("#print").click(function(e) {
        printbody()
   }),*/
   jQuery("#SkipContent").next().attr("id","row-content");
    function printData() {
        var divToPrint=document.getElementById("row-content");
        newWin= window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }
    jQuery('#print').on('click',function(){
        jQuery("table").attr('border','1');
        printData();
    });

    jQuery(".textSizing ul li").eq(0).find("a").click(function(e) {
        e.stopPropagation(), e.preventDefault(), _set_font_size("increase")
    }), jQuery(".textSizing ul li").eq(1).find("a").click(function(e) {
        e.stopPropagation(), e.preventDefault(), _set_font_size()
    }), jQuery(".textSizing ul li").eq(2).find("a").click(function(e) {
        e.stopPropagation(), e.preventDefault(), _set_font_size("decrease")
    }), jQuery("a[href*=Skip").click(function(e) {
        e.preventDefault(), $target = jQuery(this).attr("href"), $targetCountTop = jQuery($target).offset().top, jQuery("html, body").animate({
            scrollTop: $targetCountTop + "px"
        }, 500, function() {})
    }), jQuery("#flexSlider").flexslider({
        animation: "slide",
        controlNav: !0
    }), jQuery("#flexSlider2").flexslider({
        animation: "slide",
        controlNav: !0
    }),  jQuery("#footerScrollbar2").flexslider({
        animation: "slide",
        animationLoop: !1,
        controlNav: !1,
        itemWidth: 300,
        itemMargin: 10,
        maxItems: 6
    }),
    jQuery(".galleryCarasole").flexslider({
        animation: "slide",
        animationLoop: !1,
        controlNav: !1,
        itemWidth: 200,
        itemMargin: 20
    }), jQuery("#carousel").flexslider({
        animation: "slide",
        controlNav: !1,
        directionNav: !1,
        animationLoop: !0,
        minItems: 3,
        slideshow: !1,
        itemWidth: 210,
        itemMargin: 5,
        direction: "vertical",
        asNavFor: "#slider"
    }), jQuery("#slider").flexslider({
        animation: "slide",
        controlNav: !1,
        animationLoop: !1,
        slideshow: !1,
        sync: "#carousel"
    }),
    jQuery(".fancybox").fancybox({

        beforeShow: function () {

                if(this.title){
                    this.title += "<br/>";
                }
                if(jQuery(this.element).parents('.fancyShare').length > 0){
                    this.title += jQuery(this.element)
                                  .parents('.fancyShare')
                                  .find('.hide.fancySocial')
                                  .html();
                }
            // var imgAlt = jQuery(this.element).find("img").attr("alt");
            // var dataAlt = jQuery(this.element).data("alt");
            // if (imgAlt) {
            //     jQuery(".fancybox-image").attr("alt", imgAlt);
            // } else if (dataAlt) {
            //     jQuery(".fancybox-image").attr("alt", dataAlt);
            // }

        },
        helpers : {
            title : {
                type: 'inside'
            }
        },
        afterShow: function () { jQuery(".fancybox-skin").attr("tabindex",-1).focus() },
        afterClose: function(){
         jQuery(this.element).focus();
        }

      });
      jQuery("#infotab").easyResponsiveTabs({
        type: "default",
        width: "auto",
        fit: !0,
        tabidentify: "hor_1",
        activate: function(e) {
            var t = jQuery(this),
                i = jQuery("#nested-tabInfo"),
                o = jQuery("span", i);
            o.text(t.text()), i.show()
        }
    }), jQuery("#galleryTab").easyResponsiveTabs({
        type: "default",
        width: "auto",
        fit: !0,
        tabidentify: "hor_1",
        activate: function(e) {
            var t = jQuery(this),
                i = jQuery("#nested-tabInfo"),
                o = jQuery("span", i);
            o.text(t.text()), i.show()
        }
    }), jQuery(".tabassign").easyResponsiveTabs({
        type: "default",
        width: "auto",
        fit: !0,
        tabidentify: "hor_1",
        activate: function(e) {
            var t = jQuery(this),
                i = jQuery("#nested-tabInfo"),
                o = jQuery("span", i);
            o.text(t.text()), i.show()
        }
    }), jQuery(".tabassignVertical").easyResponsiveTabs({
        type: "vertical",
        width: "auto",
        fit: !0,
        tabidentify: "hor_1",
        activate: function(e) {
            var t = jQuery(this),
                i = jQuery("#nested-tabInfo"),
                o = jQuery("span", i);
            o.text(t.text()), i.show()
        }
    }),jQuery("img.svg").each(function() {
        var e = jQuery(this),
            t = e.attr("id"),
            i = e.attr("class"),
            o = e.attr("src");
        jQuery.get(o, function(o) {
            var n = jQuery(o).find("svg");
            "undefined" != typeof t && (n = n.attr("id", t)), "undefined" != typeof i && (n = n.attr("class", i + " replaced-svg")), n = n.removeAttr("xmlns:a"), e.replaceWith(n)
        }, "xml")
    }), addFocusClass(), jQuery(".various").fancybox({
        maxWidth: 800,
        maxHeight: 600,
        fitToView: !1,
        width: "70%",
        height: "70%",
        autoSize: !1,
        closeClick: !1,
        openEffect: "none",
        closeEffect: "none",
        afterShow: function () { jQuery(".fancybox-skin").attr("tabindex",-1).focus() },
        afterClose: function(){
         jQuery(this.element).focus();
        }
    }), jQuery(".viewSwicther .thumbs-view-btn").click(function(e) {
        e.preventDefault(), jQuery(".thumbs_view").removeClass("list-view")
    }), jQuery(".viewSwicther .thumbs-list-view-btn").click(function(e) {
        e.preventDefault(), jQuery(".thumbs_view").addClass("list-view")
    })
});


/*var stickyOffset = jQuery("#mainHeader").offset().top + jQuery("#mainHeader").height(),
    dpName = jQuery(".logo>a>span").text(),
    emblem = jQuery(".logo>.emblem>img").attr("src");
jQuery(window).scroll(function() {
    var e = jQuery("#mainHeader"),
        t = jQuery(window).scrollTop();
    t >= stickyOffset ? e.addClass("fixedHeader") : e.removeClass("fixedHeader"), jQuery(window).width() > 640 && (jQuery(".appendeddpName").remove(), jQuery(".fixedHeader").find(".govBranding").find("ul").append('<li class="appendeddpName"><a href="#">' + dpName + "</a></li>"), jQuery(".appendedemblem").remove(), jQuery(".fixedHeader").find(".main-menu").prepend('<img class="appendedemblem" src=' + emblem + ">"))
});*/
})(jQuery);

jQuery('table').basictable({
        breakpoint: 767,
        forceResponsive: true
    		});


	jQuery('table').each(function(index, element) {
        if((jQuery(this).find('th').length > 0) || jQuery(this).find('thead').length > 0){
			//var thlnth = $('table').find('th').length;

			jQuery(this).basictable({
        breakpoint: 767,
        forceResponsive: true
    		});

			//$(this).css('border', thlnth+'px solid red');

		}else{
			jQuery(this).wrap("<div class='tableWrapperResponsive' style='width:100%; overflow-x:scroll'>  </div>")
		}
    });

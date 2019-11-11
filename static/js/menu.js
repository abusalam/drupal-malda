function menu_re_position() {
    if (jQuery(window).innerWidth() >= 640) {
        var e = jQuery(".menuWrapper .container").width(),
            t = 0;
        jQuery(".menu>ul>li").each(function(s, a) {
          var cl= jQuery(this).attr('class');
            if (t += jQuery(this).width(), t > e - 130 && (jQuery(this).hasClass("moreNav") || (jQuery(this).remove(), jQuery("#overflowMenu .ofMenu>ul").append("<li class='"+cl+"'>" + jQuery(this).html() + "</li>")), !(jQuery(".menu ul .moreNav").length > 0))) {
                var n = jQuery('<li class="moreNav"><a href="#" aria-label="More Menu" title="More Menu"><span class="icon-menu" aria-hidden="true"></span>'+jQuery('.menuMoreText').html()+' </a></li>');
                jQuery('.menuMoreText').html('');
                jQuery(".menu>ul").append(n), n.click(openMenu)
            }
        })
    }
}

function menu_toggle() {
    jQuery(".showhide").click(function(e) {
        jQuery(".main-menu").stop().slideToggle("slow")
    }), jQuery(document).innerWidth() < 940 && jQuery(".main-menu .nav-item a").click(function(e) {
        jQuery(this).next("div").stop().slideToggle("slow")
    })
}

function openMenu() {
    if(jQuery('body').hasClass('rtl')){
    jQuery("#overflowMenu").animate({
        left: "0px"
    })
}else{
    jQuery("#overflowMenu").animate({
        right: "0px"
    })
}
}


function menuMaxheight() {
    var mmh = jQuery(window).height()-(jQuery('#topBar').height() + jQuery('.header-wrapper').height());

    jQuery('.menuWrapper').css('max-height', mmh);
}




/*jQuery(window).resize(function(e) {
    menu_re_position();
    menuMaxheight();

});*/


/*== Menu Responsive */

function responsiveAccordion(){
  if(jQuery(document).width()<640){
  jQuery('.menu li:has(ul) ul').slideUp();
  /*jQuery('.menu li:has(ul)>a').click(function(e){
    e.preventDefault();
    jQuery(this).next('ul').stop().slideToggle('fast');
  })*/
}
}

function offMenuToggle(){
  if(jQuery(this).parent().find(">ul").length > 0) {
        e.preventDefault();
  }
}


jQuery(document).ready(function() {
  menu_re_position();
  responsiveAccordion();
  menuMaxheight();
  jQuery(".moreNav a").on("click", function(e) {
      e.preventDefault(), e.stopPropagation(), openMenu()
  });
  jQuery('#overflowMenu a:first').on("keydown", function(e) {
    if(e.keyCode == 9) {
        if(e.shiftKey) {
            
            var t = jQuery("#overflowMenu").width();
        if(jQuery('body').hasClass('rtl')){
            jQuery("#overflowMenu").stop().animate({
            left: -t
        })
    }else{
        jQuery("#overflowMenu").stop().animate({
            right: -t
        })
    }
        }
        else {

        }
    }
  });
  jQuery(".moreNav a").on("keydown", function(e) {

      if(e.keyCode == 9) {
        if(e.shiftKey) {

        }
        else {
            openMenu();
        }
    }
  });
  jQuery(".closeMenu").on("keyup", function(e) {

    if(e.keyCode == 9) {
      if(e.shiftKey) {
          //closeMenu
          openMenu();
      }
      else {

      }
  }
});
  jQuery(".wrapper").click(function(e) {
      var t = jQuery("#overflowMenu").width(),
          s = jQuery(".moreNav");
          if(jQuery('body').hasClass('rtl')){
      0 === s.has(e.target).length && jQuery("#overflowMenu").stop().animate({
          left: -t
      })
    }else{
        0 === s.has(e.target).length && jQuery("#overflowMenu").stop().animate({
            right: -t
        })
    }
    });

    /*jQuery(".ofMenu ul li a").hover(function(e) {

      if(jQuery(this).parent().find(">ul").length > 0) {
            e.preventDefault();
            //jQuery(".ofMenu>ul>li>ul").stop().slideUp();
              jQuery(this).next("ul.sub-menu").stop().slideToggle();
      }
    })*/

    jQuery('.ofMenu ul li').hover( function(e) {
      jQuery(this).siblings().children('ul').stop().slideUp();
      jQuery(this).children('ul').css('padding-top','0');
      jQuery(this).children('ul').css('padding-bottom','0');
      jQuery(this).children('ul.sub-menu').css('height','auto');
      jQuery(this).siblings().children('ul').css('height','auto');
      jQuery(this).children('ul').stop().slideDown();
    }, function(){
        jQuery(this).children('ul').css('height','auto');
        jQuery(this).parent().siblings().children('ul').stop().slideUp();
    });

    jQuery(".ofMenu>ul>li>a").on("keydown", function(e) {
      if(e.keyCode==9){
            jQuery(this).parent().siblings().children('ul').stop().slideUp();
            jQuery(this).next("ul").css('padding-top','0');
            jQuery(this).next("ul").css('padding-bottom','0');
            jQuery(this).next("ul").css('height','auto');
            jQuery(this).next("ul").stop().slideDown();
      }
    });

    jQuery(".ofMenu>ul>li>ul>li>a").on("keydown", function(e) {
      if(e.keyCode==9){
            jQuery(this).parent().siblings().children('ul').stop().slideUp();
            jQuery(this).next("ul").css('padding-top','0');
            jQuery(this).next("ul").css('padding-bottom','0');
            jQuery(this).next("ul").css('height','auto');
            jQuery(this).next("ul").stop().slideDown();
      }
    });

    jQuery(".menuToggle").click(function(e) {
        e.preventDefault();
        jQuery(".menuWrapper").stop().slideToggle();
    });
    jQuery(".closeMenu").on("keydown", function(e) {
        if (9 === e.keyCode) {
            if(e.shiftKey) {
            
    }else{
        var t = jQuery("#overflowMenu").width();
        if(jQuery('body').hasClass('rtl')){
        jQuery(this).parent("#overflowMenu").stop().animate({
            left: -t
        })
    }else{
        jQuery(this).parent("#overflowMenu").stop().animate({
            right: -t
        })
    }
    }
        }
    });
    jQuery(".closeMenu").on("click", function(e) {
       e.preventDefault();
       var t = jQuery("#overflowMenu").width();
       if(jQuery('body').hasClass('rtl')){
        jQuery(this).parent("#overflowMenu").stop().animate({
            left: -t
        })
    }else{
        jQuery(this).parent("#overflowMenu").stop().animate({
            right: -t
        })
    }
   });


  // Setup the a11y nav
    jQuery('.nav').setup_navigation();

  // RWD Nav Pattern
  jQuery('body').addClass('js');
  var jQuerymenu = jQuery('#menu'),
          jQuerymenulink = jQuery('.menu-link'),
          jQuerymenuTrigger = jQuery('.has-subnav > a');

        jQuerymenulink.click(function(e) {
            e.preventDefault();
            jQuerymenulink.toggleClass('active');
            jQuerymenu.toggleClass('active');
        });

        jQuerymenuTrigger.click(function(e) {
            e.preventDefault();
            var jQuerythis = jQuery(this);
            jQuerythis.toggleClass('active').next('ul').toggleClass('active');
        });
});
/*
jQuery(function(){
    jQuery('.nav').setup_navigation();
});
*/
var keyCodeMap = {
        48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
        65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
        77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
        96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
}

jQuery.fn.setup_navigation = function(settings) {

    settings = jQuery.extend({
        menuHoverClass: 'show-menu',
    }, settings);

    // Add ARIA role to menubar and menu items
    jQuery(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');

    var top_level_links = jQuery(this).find('li  a');

    // Added by Terrill: (removed temporarily: doesn't fix the JAWS problem after all)
    // Add tabindex="0" to all top-level links
    // Without at least one of these, JAWS doesn't read widget as a menu, despite all the other ARIA
    //jQuery(top_level_links).attr('tabindex','0');

    // Set tabIndex to -1 so that top_level_links can't receive focus until menu is open
    jQuery(top_level_links).next('ul')
        .attr({  'role': 'menu' })
        .find('a')

    // Adding aria-haspopup for appropriate items
    jQuery(top_level_links).each(function(){
        if(jQuery(this).next('ul').length > 0){
            jQuery(this).parent('li').attr('aria-haspopup', 'true');
      jQuery(this).parent('li').addClass('has-sub');
      jQuery(this).append('<span class="indicator1"></span>')

    }
    });

    jQuery(top_level_links).hover(function(){
        jQuery(this).closest('ul')
            .attr('aria-hidden', 'false')
            .find('.'+settings.menuHoverClass)
            .attr('aria-hidden', 'true')
            .removeClass(settings.menuHoverClass)
            .find('a')
            .attr('tabIndex',-1);
        jQuery(this).next('ul')
            .attr('aria-hidden', 'false')
            .addClass(settings.menuHoverClass)
            .find('a').attr('tabIndex',0);
    });

    jQuery(top_level_links).parent('li').mouseleave(function(){

            jQuery(this).find('>ul').removeClass('show-menu');

    });

  jQuery(top_level_links).focus(function(){
        jQuery(this).closest('ul')

            .find('.'+settings.menuHoverClass)
            .attr('aria-hidden', 'true')
            .removeClass(settings.menuHoverClass)
            .find('a')
            .attr('tabIndex',-1);

    jQuery(this).next('ul')
            .attr('aria-hidden', 'false')
            .addClass(settings.menuHoverClass)
            .find('a').attr('tabIndex',0);
    });

    // Bind arrow keys for navigation
    jQuery(top_level_links).keydown(function(e){
        if(e.keyCode == 37) {
            e.preventDefault();
            // This is the first item
            if(jQuery(this).parent('li').prev('li').length == 0) {
                jQuery(this).parents('ul').find('> li').last().find('a').first().focus();
            } else {
                jQuery(this).parent('li').prev('li').find('a').first().focus();
            }
        } else if(e.keyCode == 38) {
            e.preventDefault();
            if(jQuery(this).parent('li').find('ul').length > 0) {
                jQuery(this).parent('li').find('ul')
                    .attr('aria-hidden', 'false')
                    .addClass(settings.menuHoverClass)
                    .find('a').attr('tabIndex',0)
                    .last().focus();
            }
        } else if(e.keyCode == 39) {
            e.preventDefault();
            // This is the last item
            if(jQuery(this).parent('li').next('li').length == 0) {
                jQuery(this).parents('ul').find('> li').first().find('a').first().focus();
            } else {
                jQuery(this).parent('li').next('li').find('a').first().focus();
            }
        } else if(e.keyCode == 40) {
            e.preventDefault();
            if(jQuery(this).parent('li').find('ul').length > 0) {
                jQuery(this).parent('li').find('ul')
                    .attr('aria-hidden', 'false')
                    .addClass(settings.menuHoverClass)
                    .find('a').attr('tabIndex',0)
                    .first().focus();
            }
        } else if(e.keyCode == 13 || e.keyCode == 32) {
            // If submenu is hidden, open it
            //e.preventDefault();
            jQuery(this).parent('li').find('ul[aria-hidden=true]')
                    .attr('aria-hidden', 'false')
                    .addClass(settings.menuHoverClass)
                    .find('a').attr('tabIndex',0)
                    .first().focus();
        } else if(e.keyCode == 27) {
            e.preventDefault();
            jQuery('.'+settings.menuHoverClass)
                .attr('aria-hidden', 'true')
                .removeClass(settings.menuHoverClass)
                .find('a')
                .attr('tabIndex',-1);
        } else {
            jQuery(this).parent('li').find('ul[aria-hidden=false] a').each(function(){
                if(jQuery(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
                    jQuery(this).focus();
                    return false;
                }
            });
        }
    });


    var links = jQuery(top_level_links).parent('li').find('ul').find('a');
    jQuery(links).keydown(function(e){
        if(e.keyCode == 38) {
            e.preventDefault();
            // This is the first item
            if(jQuery(this).parent('li').prev('li').length == 0) {
                jQuery(this).parents('ul').parents('li').find('a').first().focus();
            } else {
                jQuery(this).parent('li').prev('li').find('a').first().focus();
            }
        } else if(e.keyCode == 40) {
            e.preventDefault();
            if(jQuery(this).parent('li').next('li').length == 0) {
                jQuery(this).parents('ul').parents('li').find('a').first().focus();
            } else {
                jQuery(this).parent('li').next('li').find('a').first().focus();
            }
        } else if(e.keyCode == 27 || e.keyCode == 37) {
            e.preventDefault();
            jQuery(this)
                .parents('ul').first()
                    .prev('a').focus()
                    .parents('ul').first().find('.'+settings.menuHoverClass)
                    .attr('aria-hidden', 'true')
                    .removeClass(settings.menuHoverClass)
                    .find('a')
                    .attr('tabIndex',-1);
        } else if(e.keyCode == 32) {
            e.preventDefault();
            window.location = jQuery(this).attr('href');
        } else {
            var found = false;
            jQuery(this).parent('li').nextAll('li').find('a').each(function(){
                if(jQuery(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
                    jQuery(this).focus();
                    found = true;
                    return false;
                }
            });

            if(!found) {
                jQuery(this).parent('li').prevAll('li').find('a').each(function(){
                    if(jQuery(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
                        jQuery(this).focus();
                        return false;
                    }
                });
            }
        }
    });


    // Hide menu if click or focus occurs outside of navigation
    jQuery(this).find('a').last().keydown(function(e){
        if(e.keyCode == 9) {
            // If the user tabs out of the navigation hide all menus
            jQuery('.'+settings.menuHoverClass)
                .attr('aria-hidden', 'true')
                .removeClass(settings.menuHoverClass)
                .find('a')
                    .attr('tabIndex',-1);
        }
    });

    jQuery(document).click(function(evt){ 
        if(!jQuery(evt.target).is('#overflowMenu')) {
            var t = jQuery("#overflowMenu").width();
            if(jQuery('body').hasClass('rtl')){
            jQuery("#overflowMenu").stop().animate({
            left: -t
            })
            }else{
            jQuery("#overflowMenu").stop().animate({
            right: -t
            })
            }
        }
    });

  jQuery(document).click(function(){ jQuery('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1); });

    jQuery(this).click(function(e){
        e.stopPropagation();
    });
}

jQuery(document).ready(function(){
	
	var $winWidth = jQuery( window ).width();
	if ($winWidth <= 639) {
		
		jQuery(".menu ul li").each(function(index, element) {
            
			if(jQuery(element).hasClass("menu-item-has-children")){
				jQuery(".indicator1").hide();
				jQuery("<a href='javascript:void(0)' aria-label='Click to expand submenu' class='menu-toggle'>&nbsp;</a>").insertAfter(jQuery(element).find(" > a "));			
			}
        });
	}
	jQuery(".menu-toggle").click(function(e){
		e.preventDefault();
      jQuery(this).parent().siblings().children('ul').stop().slideUp();
      jQuery(this).parent().siblings().children('a').removeClass("open");
	  jQuery(this).parent().siblings().children('a.menu-select').removeClass("menu-select");
	  jQuery(this).next('ul').stop().slideToggle('fast');
      jQuery(this).toggleClass("open");
	  if(jQuery(this).hasClass('open')){
		  jQuery(this).attr('aria-label','Click to collapse submenu');
	  }else{
			jQuery(this).attr('aria-label','Click to expand submenu');
	  }
	  jQuery(this).prev().toggleClass("menu-select");
	});
});

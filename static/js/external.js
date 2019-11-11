jQuery(window).load(function(){
    // Menu expandable accessibility
	jQuery(".menu").find('[aria-haspopup=true]').attr('aria-expanded','false');
	jQuery(".menu").find('[aria-haspopup=true]').hover(function(){
		jQuery(this).attr('aria-expanded','true');
	},function(){
		jQuery(this).attr('aria-expanded','false');
	});

	jQuery("#overflowMenu").find('.menu-item-has-children').attr('aria-expanded','false');
	jQuery("#overflowMenu").find('.menu-item-has-children').hover(function(){
		jQuery(this).attr('aria-expanded','true');
	},function(){
		jQuery(this).attr('aria-expanded','false');
	});

});	
	jQuery(document).ready(function(jQuery){


		//Accessibility Mobile
		jQuery(window).resize(function(){
				jQuery('.accessiblelinks').removeAttr('style');
		if (jQuery(window).innerWidth() <= 940) {
		jQuery('.accessible-icon').click(function(){
			jQuery('.accessiblelinks').show();
		});

		jQuery(document).on('click', function (e) {
			if (jQuery(window).innerWidth() <= 940) {
				if (jQuery(e.target).closest(".accessible-icon").length === 0) {
					jQuery('.accessiblelinks').hide();
				}
			}
		});

		jQuery(".accessible-icon").on("keyup", function(e) {

			if(e.keyCode == 9) {
			  if(e.shiftKey) {
	  
			  }
			  else {
				jQuery('.accessiblelinks').show();
			  }
		  }
		});

		jQuery(".accessiblelinks ul a:last").on("keydown", function(e) {

			if(e.keyCode == 9) {
			  if(e.shiftKey) {
	  
			  }
			  else {
				jQuery('.accessiblelinks').hide();
			  }
		  }
		});
	}
});

	//change-language
	jQuery(".change-language").on("keydown", function(e) {

		if(e.keyCode == 9) {
		  if(e.shiftKey) {
			jQuery('.select-lang').hide();
		  }
		  else {
		
		  }
	  }
	});

	jQuery(".change-language").on("keyup", function(e) {

		if(e.keyCode == 9) {
		  if(e.shiftKey) {

		  }
		  else {
			jQuery('.select-lang').show();
		  }
	  }
	});

		document.onkeydown = function(evt) {
		    evt = evt || window.event;
		    if (evt.keyCode == 27) {
		    	jQuery(":focus").each(function() {
		    		if(jQuery(this).parents('.wpb_column').next('div').length===1)
		    		{
				    	jQuery(this).parents('.wpb_column').next().find('a:first').focus();
					}

					if(jQuery(this).parents('.wpb_column').next('div').length===0)
		    		{
		    			if(jQuery(this).parents('.vc_row').next('div').length===0)
		    			{
		    				jQuery('.footerMenu').find(':focusable').eq(0).focus();
		    			}
		    			if(jQuery(this).parents('.vc_row').next('div').length===1)
		    			{
		    				jQuery(this).parents('.vc_row').next('div').find('a:first').focus();
		    			}
		    			
		    		}
				});
		    }
		};

//jQuery('body').addClass('show-focus-outlines');
	document.addEventListener('keydown', function(e) {
	if (e.keyCode === 9) {
		jQuery(".menu").find('[aria-haspopup=true]').focusin(function(){
			jQuery(this).attr('aria-expanded','true');
		});
		jQuery(".menu").find('[aria-haspopup=true]').focusout(function(){
			jQuery(this).attr('aria-expanded','false');
		});

		jQuery("#overflowMenu").find('.menu-item-has-children').focusin(function(){
			jQuery(this).attr('aria-expanded','true');
		});
		jQuery("#overflowMenu").find('.menu-item-has-children').focusout(function(){
			jQuery(this).attr('aria-expanded','false');
		});

		jQuery('body').addClass('show-focus-outlines');

		}

});


document.addEventListener('mousedown', function(e) {
	//e.preventDefault();
	jQuery('body').removeClass('show-focus-outlines');
});

jQuerytoggleButtons = jQuery('[data-vc-tabs=""]');
jQuerytoggleButtons.on('click.flexSetup',function(){

  if(jQuery('#video_galery').length > 0){
    jQuery('#video_galery').data('flexslider').setup();
    jQuerytoggleButtons.off('click.flexSetup');
  }


});

	jQuery("a.yes").click(function(e){
		location.href='/login';
	});

	jQuery(".skip-to-content").click(function(e){
		e.preventDefault();
		jQuery('#SkipContent').focus();
	});

	jQuery("r.yes").click(function(t){
		location.href='/login';
	});
	jQuery(".read-text").click(function(t){
		t.preventDefault();
		jQuery('#show-description').focus();
	});





	//code for collaps/expand start
		jQuery(".colspexp_header").click(function () {
			jQuerycolspexp_header = jQuery(this);
			jQuerycolspexp_content = jQuerycolspexp_header.next();
			jQuerycolspexp_content.slideToggle(500, function () {
					jQuerycolspexp_header.text(function () {
							return jQuerycolspexp_content.is(":visible") ? "Hide Code" : "Show Code";
					});
			});

	});
	//code for collaps/expand end
	//less than 4 column table layout fixed start
jQuery('table').each(function() {
	var numCols = jQuery(this).find('tr')[0].cells.length
	if(numCols < 4 )
		{
jQuery(this).css('table-layout','fixed');
		}
		});
		//less than 4 column table layout fixed end

		//VC Tabs keyboard accessibility start
		document.addEventListener('keydown', function(e) {
    var shift=e.shiftKey;
    if (e.keyCode === 9 && !e.shiftKey) {
			jQuery('.vc_tta-tab').focusout(function(){
			    if(!shift){
			    if(jQuery(this).hasClass('vc_active')){
			var dis = jQuery(this);
			        var hr = jQuery(this).children().attr('href');
			jQuery(hr).find('ul li:first-child a').focus();
			jQuery(hr).find('a:last').focusout( function() {
			jQuery(hr).removeAttr('tabindex','-1');
			jQuery(hr).find('a').attr('tabindex','-1');
			if(dis.closest('li').next()!=null)
			{
	    dis.closest('li').next().find('a').focus();
			}
			});

    	}
			}
		});

		//Code for Public Utilities keybord tab accessible
			jQuery('.resp-tab-item.resp-tab-active a').focusout(function(){
				var resp_tab = jQuery(this);
				var dataid = jQuery(this).parent().attr('data');
			    if(!shift){
						if(dataid)
						{
							jQuery('#'+dataid).find(".ngoMainCintent:first-child a:first-child").focus();
							var maxpage = jQuery('#'+dataid).find(".ngoMainCintainer").attr('maxpage');

							if(maxpage=='1')
							{
								jQuery('#'+dataid).find(".ngoMainCintent:last-child a:last").focusout(function(){
									resp_tab.parent().next().find('a').focus();
								});
							}
						}
			}
		});

	}

	});
    jQuery('.vc_tta-tab a').click(function(){
		var dis = jQuery(this);
		var href = jQuery(this).attr('href');
		jQuery(href).find('ul li:first-child a').focus();
		jQuery(href).find('a:last').focusout( function() {
		    jQuery(href).removeAttr('tabindex','-1');
		jQuery(href).find('a').attr('tabindex','-1');
		if(dis.closest('li').next()!=null)
		{
		    dis.closest('li').next().find('a').focus();
		}
		});

    });

		document.addEventListener('keydown', function(e) {
		    if (e.shiftKey && e.keyCode===9) {
		jQuery('.vc_tta-panel').each(function(){
		    var dis =jQuery(this);
		    jQuery(this).removeAttr('tabindex','-1');
		        if(jQuery(this).hasClass('vc_active')){
            jQuery(this).removeAttr('tabindex','-1');
            jQuery(this).find('a').removeAttr('tabindex','-1');
            jQuery(this).find('a:last').focusout(function(){

                jQuery(this).prev().find('a').focus();
                dis.removeAttr('tabindex','-1');
                //dis.parent('.vc_tta-container').attr('tabindex','-1');;
            });

            jQuery('.vc_tta-tab').focusout(function(){
    if(jQuery(this).hasClass('vc_active')){
                var hr = jQuery(this).children().attr('href');
        jQuery(hr).find('ul li:first-child a').blur();
        return false;
    }
        });

        }
    });
    }

});
	//VC Tabs keyboard accessibility end

jQuery("nav li li").mouseover(function(){
	if(jQuery(this).children('ul').length == 1) {
		var parent = jQuery(this);
		var child_menu = jQuery(this).children('ul');
		if( jQuery(parent).offset().left + jQuery(parent).width() + jQuery(child_menu).width() > jQuery(window).width() ){
		jQuery(child_menu).css('left', '-' + jQuery(parent).width() + 'px');
	} else {
			jQuery(child_menu).css('right', '-' + jQuery(parent).width() + 'px');
		}
	}
	});

});

/*
*   Search Input Validation
*/

function search_validation(){
    if (document.getElementById('search').value==null || document.getElementById('search').value=="" || document.getElementById('search').value.length < 3) {
        
        document.getElementById('search').focus();
        alert("Search text should be minimum 3 characters long!");
        return false;
        
    }
}

function search_temp_validation(){
    if (document.getElementById('search_temp').value==null || document.getElementById('search_temp').value=="" || document.getElementById('search_temp').value.length < 3) {
        
        document.getElementById('search_temp').focus();
        alert("Search text should be minimum 3 characters long!");
        return false;
        
    }
}

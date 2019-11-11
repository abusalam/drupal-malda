//custom flexslider start
jQuery(document).ready(function($) {

//Public Utility Tab custom js
var len =jQuery('body').find('.utilityTabContainer');
if(len.length==1){
  var hashval = window.location.hash;
  if(hashval!=''){
    var hash_val = hashval.split("#");
    jQuery('ul.resp-tabs-list li').each(function (i) {
      jQuery(this).removeClass('resp-tab-active');
      if(jQuery(this).attr('data')==hash_val[1]){
        jQuery(this).addClass('resp-tab-active');
      }
    });
    jQuery('div.resp-tabs-container .resp-tab-content').each(function (i) {
      var pos = jQuery(this).index();
      jQuery(this).removeClass('resp-tab-content-active');
      jQuery(".resp-accordion").eq(pos).removeClass('resp-tab-active');
      jQuery(this).hide();
      if(jQuery(this).attr('id')==hash_val[1]){
        jQuery(this).addClass('resp-tab-content-active');
        jQuery(this).show();
        jQuery(".resp-accordion").eq(pos).addClass('resp-tab-active');
      }
    });
  }
}

//=========================
jQuery('.thumb-bottom-scroll').flexslider({
  animation: "fade",
  controlNav: false,
  animationLoop: false,
  slideshow: false,
  sync: ".thumb-bottom-crucel"
}),
jQuery('.thumb-bottom-crucel').flexslider({
  animation: "slide",
  controlNav: false,
  animationLoop: false,
  slideshow: false,
  itemWidth: 210,
		//itemMargin: 5,
    asNavFor: ".thumb-bottom-scroll"
  }),
//=========================

jQuery('.thumb-bottom').flexslider({
  animation: "fade",
  controlNav: "thumbnails",
  start: function(slider){
    jQuery('body').removeClass('loading');
  }
});
//=========================
jQuery('.no-thumb').flexslider({
  animation: "fade",
  controlNav: false,
  start: function(slider){
    jQuery('body').removeClass('loading');
  }
});
//=========================
jQuery('.thumb-right').flexslider({
  animation: "fade",
  controlNav: "thumbnails",
  start: function(slider){
    jQuery('body').removeClass('loading');
  }
});
//=========================
jQuery('.thumb-left').flexslider({
  animation: "fade",
  controlNav: "thumbnails",
  start: function(slider){
    jQuery('body').removeClass('loading');
  }
});

//=========================

	//Main slider components start
	jQuery(".full-cntrl-center-caption-blank").flexslider({
		animation: "slide",
		directionNav: true,
		prevText: "Previous",
		nextText: "Next",
		pausePlay: true,
		pauseText: "Pause",
		playText: "Play",
		controlNav: true
  }),
	jQuery(".flexslider").flexslider({
		animation: "slide",
		directionNav: true,
		prevText: "Previous",
		nextText: "Next",
		pausePlay: true,
		pauseText: "Pause",
		playText: "Play",
		controlNav: false,
  start: function(){
                  jQuery('.flexslider').resize();
                  //jQuery( '.flexslider' ).css( 'display', 'none' );
              }
 });


  /* jQuery('.expand-cntr').click(function(e){
    e.preventDefault();
    var ht = jQuery(this).parent('.ngoMainCintent').prop('scrollHeight');
    if(jQuery(this).hasClass('plus'))
    {

      jQuery(this).parent('.ngoMainCintent').css('height',ht);
      jQuery(this).children().html('Less');
      jQuery(this).removeClass('plus');
      jQuery(this).addClass('minus');
    }
    else if(jQuery(this).hasClass('minus'))
    {
      jQuery(this).parent('.ngoMainCintent').css('height','210px');
      jQuery(this).children().html('More');
      jQuery(this).removeClass('minus');
      jQuery(this).addClass('plus');
    }
  });

 each_div();
  jQuery('.resp-tab-item').click(function(){
   each_div();
 });

  function each_div()
  {
   jQuery("body").find(".dt_boxed" ).each(function() {

    var ht = jQuery(this).prop('scrollHeight');

    if(ht<'240' || ht=='240')
    {
      jQuery(this).children('.expand-cntr').hide();
    }
    if(ht>'240')
    {
      jQuery(this).children('.expand-cntr').show();
    }
  });
 }*/




//Public Utilitity loader

//Load PU
if (jQuery(window).width() < '640' || jQuery(window).width() == '640') {
   jQuery('.ngoMainCintainer').removeClass('scrollpu');
   jQuery('.loadpu').show();
}
else {
   jQuery('.ngoMainCintainer').addClass('scrollpu');
   jQuery('.loadpu').hide();
}

jQuery('.loadpu').click(function(e){
  e.preventDefault();
  var th = jQuery(this);
  var tax_slug = jQuery(this).attr('data');
  var page_no = jQuery(this).attr('page');
  jQuery(".loader").css('display', 'inherit');
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ajaxurl,
        data: {
          action: "more_pu",
          post_per_page: '6',
          taxonomy: tax_slug,
          pageNo: page_no
        },
        success: function (response) {
          th.attr('page', response.page_no);
          if(response.loadbtn=='hide'){
            th.css('display','none');
          }
          jQuery("div[data='" + tax_slug + "']").append(response.data_html);
          jQuery(".loader").css('display', 'none');
            jQuery('body').trigger('targetExternalLinks');
        }
      });

});

//Scroll PU
var previousScroll = 0;
var timer;

jQuery(".scrollpu").on('scroll',function () {

	var currentScroll = jQuery(this).scrollTop();

	if (timer) {
		window.clearTimeout(timer);
	}

	timer = setTimeout(jQuery.proxy(function () {

		var tax_slug = jQuery(this).attr('data');
    var page_no = jQuery(this).attr('page');
		var max_page = jQuery(this).attr('maxpage');
    var ajax_start;
    if(!ajax_start){
		if (currentScroll > previousScroll) {
if(page_no<max_page||page_no==max_page){

			jQuery(".loader").css('display', 'inherit');
			jQuery.ajax({
				type: "post",
				dataType: "json",
				url: ajaxurl,
				data: {
					action: "more_pu",
					post_per_page: '6',
					taxonomy: tax_slug,
					pageNo: page_no
				},
        beforeSend:function(){
          ajax_start = true;
        },
				success: function (response) {
					jQuery("div[data='" + tax_slug + "']").attr('page', response.page_no).append(response.data_html);
					jQuery(".loader").css('display', 'none');
          ajax_start = false;
                    jQuery('body').trigger('targetExternalLinks');
				}
			});
    }else{
      jQuery("div[data='" + tax_slug + "']").find('.ngoMainCintent').last().find('a').last().focusout(function(){
        var tid = jQuery("div[data='" + tax_slug + "']").parent().attr('id');
        jQuery('[data='+tid+']').next().find('a').focus();
      });
    }
			previousScroll = currentScroll;
		}
  }

	}, this, [currentScroll, previousScroll]), 100);


});

jQuery('.utilityTabContainer li.resp-tab-item').on('click',function(){
  previousScroll = 0;
});


//Directory pagination
jQuery("body").find('.dir_next, .dir_prev').click(function(e){
  e.preventDefault();
  var data = jQuery(this).attr('data');
  var btn = jQuery(this);
  var page = jQuery(this).parent().siblings('.count').find('span').html();
  var slug = jQuery(this).parents('.directory').attr('data');
  jQuery.ajax({
    method: "POST",
    url: ajaxurl,
    data: { action: "more_dir", paged: page, tax_slug: slug, type: data }
  })
  .done(function( response ) {
    var obj = JSON.parse(response);
    jQuery("div[data='"+slug+"']").find("tbody").html(obj.html);
    jQuery("div[data='"+slug+"']").find(".paged").html(obj.paged);
    if(obj.last==1)
    {
      jQuery("div[data='"+slug+"']").find(".dir_next").hide();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".dir_next").show();
    }
    if(obj.first==1)
    {
      jQuery("div[data='"+slug+"']").find(".dir_prev").show();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".dir_prev").hide();
    }
      jQuery('body').trigger('targetExternalLinks');
  });
});

//Who's Who pagination
jQuery("body").find('.ww_next, .ww_prev').click(function(e){
  e.preventDefault();
  var data = jQuery(this).attr('data');
  var btn = jQuery(this);
  var page = jQuery(this).parent().siblings('.count').find('span').html();
  var slug = jQuery(this).parents('.whoswho').attr('data');
  jQuery.ajax({
    method: "POST",
    url: ajaxurl,
    data: { action: "more_ww", paged: page, tax_slug: slug, type: data }
  })
  .done(function( response ) {
    var obj = JSON.parse(response);
    jQuery("div[data='"+slug+"']").find("tbody").html(obj.html);
    jQuery("div[data='"+slug+"']").find(".paged").html(obj.paged);
    if(obj.last==1)
    {
      jQuery("div[data='"+slug+"']").find(".ww_next").hide();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".ww_next").show();
    }
    if(obj.first==1)
    {
      jQuery("div[data='"+slug+"']").find(".ww_prev").show();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".ww_prev").hide();
    }
      jQuery('body').trigger('targetExternalLinks');
  });
});

});

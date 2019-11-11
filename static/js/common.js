

jQuery(document).ready(function($){

    $('.enter-captcha').live('focus',function(){
        $(this).attr('autocomplete', 'off');
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    $('.select-lang ul li a').on('click',function(){

        if(confirm("This will lead you to "+$(this).text()+" language")){
            return true;
        }
        return false;
    });

     $('script,style').each(function(){

        var attr = $(this).attr('type');
        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).removeAttr('type');
        }
    });

    $('#SkipContent').attr('tabindex','-1');
    $('iframe').each(function(){
        $(this).removeAttr('frameborder');
        $(this).removeAttr('width');
    });

/* Where To Stay Ajax Load*/

    jQuery.ajaxSetup({ cache: false });

    jQuery('.festivalLoadDom').on('change','.wts-filter',function(event) {

        event.preventDefault();

        var data = {};
        var $this = $(this);
        var parents = $(this).parents('.wts-filter-hold');
        var isSelectParentTerm = $(this).attr('data-parent');
        var action = "where_to_stay_ajax";
        var foundPosts = 0;
        data.filterTermId = parseInt($this.val());

        $.post({
            //url:AwaasData.ajaxUrl + '? = ' + new Date().getTime(),
            url:AwaasData.ajaxUrl,
            method:'POST',
            dataType: 'JSON',
            data:{data:data,action:action},
            beforeSend:function () {

                $this.parents('.festivalLoadDom').find('.festivalcontainer').attr('data-filter-term-id',data.filterTermId);
                $this.parents('.festivalLoadDom').find('.festivalcontainer').attr('data-current-page',1);
                parents.data('ajaxRunning', true);
                $('.loader').show();
            },
            success:function (responseResults, status, xhr) {

                $this.parents('.festivalLoadDom').find('.festivalcontainer').html(responseResults.html);
                parents.data('ajaxRunning', false);
                if(responseResults.found_posts > 1){

                    if (typeof isSelectParentTerm !== typeof undefined && isSelectParentTerm !== false) {


                        parents.find('.wts-child-filter').off().attr('disabled','disabled');
                       // parents.find('.wts-child-filter').html('<option value="0">All</option>');

                        if(parseInt($this.val()) !== 0) {

                            $.post({
                                url: AwaasData.ajaxUrl,
                                method: 'POST',
                                dataType: 'JSON',
                                data: {data: data, action: 'where_to_stay_child_term_ajax'},
                                beforeSend: function () {

                                    $this.parents('.festivalLoadDom').find('.festivalcontainer').attr('data-filter-term-id', data.filterTermId);
                                    parents.data('ajaxRunning', true);

                                },
                                success: function (responseTemrs) {

                                    parents.find('.wts-child-filter').removeAttr('disabled').html(responseTemrs.html);
                                    parents.data('ajaxRunning', false);
                                    $('.loader').hide();
                                }


                            })
                        }else {
                            $('.loader').hide();
                        }

                    }else {
                        $('.loader').hide();
                    }
                }else {
                    $('.loader').hide();
                    if (typeof isSelectParentTerm !== typeof undefined && isSelectParentTerm !== false) {
                        parents.find('.wts-child-filter').attr('disabled', 'disabled');
                        //parents.find('.wts-child-filter').html('<option value="0">All</option>');
                    }
                }
            }

        })



    })

    jQuery('.festivalLoadDom').on('click','.festivalLoad .pegination li a',function(event) {

        event.preventDefault();
        var data = {};
        var $this = $(this);
        var parentUl = $this.parents('ul');
        var link = $this.attr('href');

        var action = "where_to_stay_ajax";
        data.loadAction ='page';
        data.paginateAction = $this.attr('data-action');
        data.filterTermId = parseInt($this.parents('.festivalLoadDom').find('.festivalcontainer').attr('data-filter-term-id'));
        data.currentPage = parseInt($this.parents('.festivalLoadDom').find('.festivalcontainer').attr('data-current-page'));

        if(parentUl.data('ajaxRunning')){
            return;
        }

        $.post({
            url:AwaasData.ajaxUrl,
            method:'POST',
            dataType: 'JSON',
            data:{data:data,action:action},
            beforeSend:function () {

                parentUl.data('ajaxRunning', true);
                $('.loader').show();

            },
            success:function (response, status, xhr) {

                $this.parents('.festivalLoadDom').find('.festivalcontainer').html(response.html);
                $('.festivalcontainer').attr('data-current-page',response.current);
                parentUl.data('ajaxRunning', false);
                $('.loader').hide();
                $('html, body').animate({ scrollTop: $('.festivalLoadDom').offset().top}, 800);

            }

        });
    });

    /*Gallery flexslider*/
    var getGridSize = function() {
      return (window.innerWidth < 600) ? 1 :
         (window.innerWidth < 900) ? 3 : 4;
       }
    jQuery('.prdc-glery-large').flexslider({
  		animation: "slide",
  		controlNav: true,
  		animationLoop: true,
  		slideshow: false,
  		itemWidth: 200,
      //itemMargin: 5,
      minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize() // use function to pull in initial value
  	});

   // Feedback Form Js

   if(jQuery(".wpcf7-form").length > 0){

    jQuery(".wpcf7-form span.wpcf7-form-control-wrap input,.wpcf7-form span.wpcf7-form-control-wrap textarea,.wpcf7-form span.wpcf7-form-control-wrap select").each(function () {
        var name = $(this).attr('name');

        $(this).attr('id',name);
        $(this).parent('span').prevAll('label:first').attr('for',name);

    })

    $('img.siwp_img').attr('tabindex','0').attr('aria-label','CAPTCHA Image');

    jQuery("form.wpcf7-form").on('submit',function () {

        $('input,textarea,select').css('border', '1px solid #e1e1e1');

        var name = $('input#your-name');
        var email = $('input#your-email');
        var message = $('textarea#your-message');
        var subject = $('input#your-subject');
        var captcha = $('input[name="siwp_captcha_value"]');
        var offset = 100;
        var scrollTo = '';
        var subregex = new RegExp("^[A-Za-z0-9- ]+$");
        var nameregex = new RegExp("^[A-Za-z ]+$");
        

        if(
            name.attr('aria-required') !== typeof undefined
            && name.attr('aria-required') !== false
            && name.val() == ''
        ){

            alert('Name is a required field');
            scrollTo = name;

        }else if($('body').hasClass('lang-en') && (name.val()!='' && !nameregex.test(name.val()))){
            
            alert('The Name entered is invalid. Only alphabets and space are supported.');
            scrollTo = name;

    }else if(
            email.attr('aria-required') !== typeof undefined
            && email.attr('aria-required') !== false
            && email.val() == ''
        ){

            alert('Email is a required field');
            scrollTo = email;

        }else if(!validateEmail(email.val())){

            alert('Email id is invalid');
            scrollTo = email;

        }else if($('body').hasClass('lang-en') && (subject.val()!='' && !subregex.test(subject.val()))){
            
                alert('The subject entered is invalid. Only alphabets, numbers, space and "-" are supported.');
                scrollTo = subject;

        }else if(
            message.attr('aria-required') !== typeof undefined
            && message.attr('aria-required') !== false
            && message.val() == ''
        ){
            alert('Message is a required field');
            scrollTo = message;
        }else if(
            captcha.attr('aria-required') !== typeof undefined
            && captcha.attr('aria-required') !== false
            && captcha.val() == ''
        ){
            alert('Captcha is a required field');
            scrollTo = captcha;
        }

        if (scrollTo !== '') {

            $('html, body').animate({
                scrollTop: (scrollTo.css('border', '2px solid #ff0000').offset().top-offset)
            }, 1500);
            setTimeout(function () {
                scrollTo.focus();
            },1400)
            return false;
        }

    })

    $('span.wpcf7-form-control-wrap').each(function(i,element){
        var ariaLabel = '';
        if($(this).find('input').length > 0){
            ariaLabel = $(this).find('input').attr('name') + ' ';
        }

        ariaLabel += $(this).find('span.wpcf7-not-valid-tip').text();

        $(this).find('span.wpcf7-not-valid-tip')
            .attr('tabindex','0')
            .attr('aria-label',ariaLabel);
    })
}


$('img').each(function () {
    if(typeof $(this).attr('alt') === "undefined"){
        $(this).attr('alt','');
    }
});


});


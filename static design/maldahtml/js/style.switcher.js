function getCookie(e) {
    var t = new RegExp(e + "=[^;]+", "i");
    return document.cookie.match(t) ? document.cookie.match(t)[0].split("=")[1] : null
}

function setCookie(e, t, s) {
    var n = new Date;
    "undefined" != typeof s ? n.setDate(n.getDate() + parseInt(s)) : n.setDate(n.getDate() - 5);
    document.cookie = e + "=" + t + "; expires=" + n.toGMTString() + "; path=/"
}

function deleteCookie(e) {
    setCookie(e, "moot")
}

function setStylesheet(e, t) {
    var s, n, o = [""];
    if (setStylesheet.chosen) try {
        document.getElementsByTagName("head")[0].removeChild(setStylesheet.chosen)
    } catch (a) {}
    for (s = 0; n = document.getElementsByTagName("link")[s]; s++) "alternate stylesheet" == n.getAttribute("rel").toLowerCase() && n.getAttribute("title") && (n.disabled = !0, o.push(n), n.getAttribute("title") == e && (n.disabled = !1, setStylesheet.chosen = document.createElement("link"), setStylesheet.chosen.rel = "stylesheet", setStylesheet.chosen.type = "text/css", n.media && (setStylesheet.chosen.media = n.media), setStylesheet.chosen.href = n.href, document.getElementsByTagName("head")[0].appendChild(setStylesheet.chosen)));
    if ("undefined" != typeof t) {
        var r = Math.floor(Math.random() * o.length);
        o[r].disabled = !1
    }
    return "undefined" != typeof t && "" != o[r] ? o[r].getAttribute("title") : ""
}

function chooseStyle(e, t) {
    document.getElementById && (setStylesheet(e), setCookie("mysheet", e, t))
}

function indicateSelected(e) {
    if (null != selectedtitle && (void 0 == e.type || "select-one" == e.type))
        for (var e = "select-one" == e.type ? e.options : e, t = 0; t < e.length; t++)
            if (e[t].value == selectedtitle) {
                "OPTION" == e[t].tagName ? e[t].selected = !0 : e[t].checked = !0;
                break
            }
}
var manual_or_random = "manual",
    randomsetting = "3 days";
if ("manual" == manual_or_random) {
    var selectedtitle = getCookie("mysheet");
    document.getElementById && null != selectedtitle && setStylesheet(selectedtitle)
} else "random" == manual_or_random && ("eachtime" == randomsetting ? setStylesheet("", "random") : "sessiononly" == randomsetting ? null == getCookie("mysheet_s") ? document.cookie = "mysheet_s=" + setStylesheet("", "random") + "; path=/" : setStylesheet(getCookie("mysheet_s")) : -1 != randomsetting.search(/^[1-9]+ days/i) && (null == getCookie("mysheet_r") || parseInt(getCookie("mysheet_r_days")) != parseInt(randomsetting) ? (setCookie("mysheet_r", setStylesheet("", "random"), parseInt(randomsetting)), setCookie("mysheet_r_days", randomsetting, parseInt(randomsetting))) : setStylesheet(getCookie("mysheet_r"))));



jQuery(document).ready(function(){

jQuery('#menu-item-278 > a, #menu-item-194 > a, #menu-item-192 >  a').click(function(){return false;});

jQuery('.dark').click(function(e){
    e.preventDefault();
jQuery("body").addClass("contrast");

if(jQuery("body").hasClass("contrast")){
    
    var thirtyDays = 1000*60*60*24*30;
var expireDate = new Date((new Date()).valueOf() + thirtyDays);

document.cookie = 'contrast' +"="+ 1 +"; expires="+expireDate.toGMTString()+"; path=/";
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
  var site_temp_uri = window.location.origin;
}
else{
  var site_temp_uri = document.location.origin;
}
jQuery('head').append('<link rel="stylesheet" type="text/css" media="screen" href="'+site_temp_uri+'/wp-content/themes/district-theme/css/high-contrast.css">');
    
    }else{
    
    var thirtyDays = 1000*60*60*24*30;
var expireDate = new Date((new Date()).valueOf() + thirtyDays);

document.cookie = 'contrast' +"="+ 0 +"; expires="+expireDate.toGMTString()+"; path=/";
jQuery("[href*='high-contrast.css']").remove();

    }

});

jQuery('.light').click(function(e){
    e.preventDefault();
jQuery("body").removeClass("contrast");

if(jQuery("body").hasClass("contrast")){
    
    var thirtyDays = 1000*60*60*24*30;
var expireDate = new Date((new Date()).valueOf() + thirtyDays);

document.cookie = 'contrast' +"="+ 1 +"; expires="+expireDate.toGMTString()+"; path=/";
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
  var site_temp_uri = window.location.origin;
}
else{
  var site_temp_uri = document.location.origin;
}
jQuery('head').append('<link rel="stylesheet" type="text/css" media="screen" href="'+site_temp_uri+'/wp-content/themes/sdo-theme/css/high-contrast.css">');
    
    }else{
    
    var thirtyDays = 1000*60*60*24*30;
var expireDate = new Date((new Date()).valueOf() + thirtyDays);

document.cookie = 'contrast' +"="+ 0 +"; expires="+expireDate.toGMTString()+"; path=/";
jQuery("[href*='high-contrast.css']").remove();

    }

});


if(getCookie('contrast') == "1") {

  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    var site_temp_uri = window.location.origin;
  }
  else{
    var site_temp_uri = document.location.origin;

  }
jQuery('head').append('<link rel="stylesheet" type="text/css" media="screen" href="'+site_temp_uri+'/wp-content/themes/district-theme/css/high-contrast.css">');
jQuery("body").addClass("contrast");
}



if(getCookie('contrast') == "0" ) {
jQuery("[href*='high-contrast.css']").remove();
jQuery("body").removeClass("contrast");

}



});

jQuery(document).ready(function($){

//$(document).ready( function(){

	var cookies = [];
	//$.cookie('testCookie', 'yes', { expires: 30, path: '/' });
	var h = window.location.hostname;
	function deleteAllCookies(delphpsession) {
		for (var it in $.cookie()){
			if((it != 'PHPSESSID')||(delphpsession == true)){
				$.removeCookie(it);
			}
		} 
	    cookies = document.cookie.split(";");
		if(cookies.length != 0){
		    for (var i = 0; i < cookies.length; i++) {
		        var cookie = cookies[i];
		        cookie = cookie.replace(/\s/g, '');
		        var eqPos = cookie.indexOf("=");
		        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		        if((name != 'PHPSESSID')||(delphpsession == true)){
		        	$.removeCookie(name, { path: '/'});
		        }
		    }
		}
	    if (cookies.length <= 1 && cookies[0].length < 2){
	    	cookies = [];
	    }
	    document.cookie = '_ga=; domain=.' + h + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = '_gat_gtag_$SiteConfig.AnalyticsCode=; domain=.' + h + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = '_gid=; domain=.' + h + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}


	var gdprAccepted = $.cookie('gdprAccepted');
	if(!gdprAccepted || gdprAccepted != 'yes'){
		deleteAllCookies(false);
		buildWarning();
	}


	function buildWarning(){
		var cookieWarning = '';
		cookieWarning += '<div class="cookieWarning" style="z-index: 9999;">';
		cookieWarning += '<p>' + gdprValues.text + '</p>';
		cookieWarning += '<div class="cookieAcceptButton" id="cookieAcceptButton">' + gdprValues.acceptBtnTitle + '</div>'
		cookieWarning += '<div class="cookieReject">' + gdprValues.rejectBtnTitle + '</div>';
		cookieWarning += '<div class="clearAllCookies">' + gdprValues.clearBtnTitle + '</div>';
		cookieWarning += '</div>';
		$('body').append(cookieWarning);
	}

	$('.cookieWarning #cookieAcceptButton').on('click', function(){
		$('.cookieWarning').fadeToggle();
		setCookie();
	})

	function setCookie(){
		$.cookie('gdprAccepted', 'yes', { expires: 30, path: '/' });
		$.cookie('visited', 'yes', { expires: 1, path: '/' });
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		for(var i = 0; i < gdprValues.cookieList.length; i++){
			//console.log(gdprValues.cookieList[i].path);
			if(isIE11){
				$.cookie(gdprValues.cookieList[i].title, gdprValues.cookieList[i].value, { expires: gdprValues.cookieList[i].expires ? parseInt(gdprValues.cookieList[i].expires):30, path: gdprValues.cookieList[i].path ? gdprValues.cookieList[i].path:"/" });
			}else if(/Edge/.test(navigator.userAgent)) {
				$.cookie(gdprValues.cookieList[i].title, gdprValues.cookieList[i].value, { expires: gdprValues.cookieList[i].expires ? parseInt(gdprValues.cookieList[i].expires):30, path: gdprValues.cookieList[i].path ? gdprValues.cookieList[i].path:"/" });
			}else{
				$.cookie(gdprValues.cookieList[i].title, gdprValues.cookieList[i].value, { expires: gdprValues.cookieList[i].expires ? parseInt(gdprValues.cookieList[i].expires):30, path: gdprValues.cookieList[i].path ? gdprValues.cookieList[i].path:"/", secure: true, samesite: 'none' });
			}
		}
	}

	$(".clearAllCookies").on('click', function(){
		deleteAllCookies(true);
		alert("All non-essential cookies are now cleared");
	});

	$('.cookieReject').on('click', function(){
		var url = window.location.href;    
		if (url.indexOf('?') > -1){
		   url += '&rejectcookies=1';
		}else{
		   url += '?rejectcookies=1';
		}
		window.location.href = url;
	})

		

});

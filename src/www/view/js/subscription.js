$(document).ready(function(){
	'use strict';
	
	if (jQuery.os.name === "iphone" || jQuery.os.name === "ipad") {
		window.scrollTo(0, 0);
		
		$(".banner .spam .form-control")
		.on('focus', function(){
			$(".banner .inner").css({"position":"absolute", "bottom":"auto"});
			window.scrollTo(0, 150);
		})
		.on('blur', function(){
			$(".banner .inner").css({"position":"fixed", "bottom":"0px"});
			window.scrollTo(0, 0);
		});
	}
});
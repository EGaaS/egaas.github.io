$(document).ready(function(){
	'use strict';
	
	$("header .logo, .subscription .logo").on('click', function () {
		var id = $(this).attr("href").split('');
		$("header .menu").click();
		
		if (id[1] === "#") {
			$.scrollTo(0, 500);
			if ($("header").hasClass("on")) {
				$("header").removeClass("on");
			}
			return false;
		}
	});
	$("header .nav .nav-link").on('click', function () {
		var id = $(this).attr("href").split('');
		
		if (!$(this).hasClass("dropdown-toggle")) {
			$("header .menu").click();
			if (id[0] === "#") {
				$.scrollTo(this.hash, 500);
				return false;
			}
		}
	});
	$("header .menu").on('click', function(){
		if ($("header").hasClass("on")) {
			$("header").removeClass("on");
		} else {
			$("header").addClass("on");
			$("header").bind('touchmove', function(e) {
				e.preventDefault();
			});
		}
		return false;
	});
});
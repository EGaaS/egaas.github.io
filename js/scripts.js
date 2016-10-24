// JavaScript Document
function Scroll(){
	'use strict';
	
	var wy = $(window).scrollTop();
	var bh = window.innerHeight;
	var hh = $("header").height() + parseInt($("header").css("border-bottom-width"));
	var lh = $("header .logo").height();
	var lt = parseInt($("header .logo").css("top"));
	var lb = $("header .logo .before");
	var la = $("header .logo .after");
	var bg = $("header .white");
	
	if (bh < 480) {
		bh = 480;
	}
	
	if (wy >= bh - (lh + lt)) {
		if (wy - (bh - (lh + lt)) >= lh) {
			lb.css({"height":lh + "px"});
			la.css({"height":"0px"});
		} else {
			lb.css({"height":wy - (bh - (lh + lt)) + "px"});
			la.css({"height":lh - (wy - (bh - (lh + lt))) + "px"});
		}
	} else {
		lb.css({"height":"0px"});
		la.css({"height":lh + "px"});
	}
	
	var header = $("header");
	
	if (wy >= bh - lh - lt * 2) {
		header.addClass("border");
	} else {
		header.removeClass("border");
	}
	if (wy >= bh - hh) {
		if (wy - (bh - hh) >= hh) {
			bg.css({"height":hh + "px"});
		} else {
			bg.css({"height":wy - (bh - hh) + "px"});
		}
	} else {
		bg.css({"height":"0px"});
	}
	
	$(".banner .inner .container .slogan, .banner .inner .container .spam").css({"transform":"translate3d(0, " + (-1*wy) + "px, 0)"});
}

$(document).ready(function(){
	'use strict';
	
	Scroll();
	
	$("header .logo, .subscription .logo").on('click', function () {
		$.scrollTo(0, 500);
		return false;
	});
	$("header .nav .nav-link").on('click', function () {
		var id = $(this).attr("href").split('');
		
		if (id[0] === "#") {
			$.scrollTo(this.hash, 500);
			$("header .menu").click();
			return false;
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
	
	$(".spam .btn").on('click', function () {
		var btn = $(this);
		var val = $(this).parents(".spam").find(".form-control");
		
		if (val.val().indexOf('@') === -1) {
			val.addClass("form-control-danger").val('Incorrect e-mail address!');
			return false;
		} else {
			$.ajax({
				url: 'http://148.251.83.120:8093/subscribe',
				type: 'POST',
				data: {
					email: val.val()
				},
				success: function(){
					val.val('Thank you!').prop("disabled", true);
					btn.prop("disabled", true);
				}    
			});
		}
	});
	$(".spam .form-control").on('focus', function () {
		var val = $(this);
		
		val.removeClass("form-control-danger");
	});
	
	var z = 2;
	var el = $("#team_particles");
	particlesJS.load('team_particles', 'js/team_particles.json');
	
	jQuery.os = { name: (/(win|mac|linux|sunos|solaris|iphone|ipad)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris') };
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
		
		$(".team article").on('click', function () {
			z += 1;
			if ($(this).hasClass("hover")) {
				$(this).removeClass("hover");
			} else {
				$(".team article").removeClass("hover");
				$(this).addClass("hover").css({"z-index":z});
				$(this).find("div").css({"z-index":z});
				el.appendTo($(this).find("h3"));
			}
		});
	} else {
		$(".team article").on('mouseenter', function () {
			z += 1;
			$(".team article").removeClass("hover");
			$(this).addClass("hover").css({"z-index":z});
			$(this).find("div").css({"z-index":z});
			el.appendTo($(this).find("h3"));
		});
		$(".team article").on('mouseleave', function () {
			$(this).removeClass("hover");
		});
	}
	if (jQuery.os.name === "mac" || jQuery.os.name === "iphone" || jQuery.os.name === "ipad") {
		$("body").addClass("macfix");
	}
	if (jQuery.os.name === "linux") {
		$("body").addClass("androidfix");
	}
});

$(window).on('load', function(){
	'use strict';
	
    Scroll();
});

$(window).on('resize', function(){
	'use strict';
	
    Scroll();
});

$(window).on('scroll', function(){
	'use strict';
	
    Scroll();
});
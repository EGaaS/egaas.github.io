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
	
	$(".banner .inner .container .slogan, .banner .inner .container .timer, .banner .inner .container .spam").css({"transform":"translate3d(0, " + (-1*wy) + "px, 0)"});
}

function showVideo(elem){
	'use strict';
	
	var video = document.createElement("div");
	var close = document.createElement("div");
	var link = elem.getAttribute("data-link");
	
	video.setAttribute("id", "video");
	video.innerHTML = link;
	close.setAttribute("data-player-close", true);
	close.innerHTML = '<span>&times;</span>';
	
	video.prepend(close);
	document.body.append(video);
	
	$("#video").bind('touchmove', function(e) {
		e.preventDefault();
	});
	
	$("[data-player-close]").on('click', function(){
		closeVideo();
		return false;
	});
	
	$("body").css({"overflow":"hidden"});
}

function closeVideo(){
	'use strict';
	
	var video = document.getElementById("video");
	video.parentNode.removeChild(video);
	
	$("body").css({"overflow":"visible"});
}

$(document).ready(function(){
	'use strict';
	
	Scroll();
	
	$("header .logo, .subscription .logo").on('click', function () {
		var id = $(this).attr("href").split('');
		
		if (id[0] === "#") {
			$.scrollTo(0, 500);
			if ($("header").hasClass("on")) {
				$("header").removeClass("on");
			}
		}
	});
	$("header .nav .nav-link").on('click', function () {
		var id = $(this).attr("href").split('');
		
		if (!$(this).hasClass("dropdown-toggle")) {
			if (id[0] === "#") {
				$.scrollTo(this.hash, 500);
				$("header .menu").click();
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
	
	$(".spam .form-control").on('focus', function () {
		var val = $(this);
		
		val.removeClass("form-control-danger");
	});
	
	$("[data-player]").on('click', function(){
		showVideo(this);
		return false;
	});
	
	var z = 2;
	var el = $("#team_particles");
	
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
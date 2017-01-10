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
	
	$(".banner .inner .container .slogan, .banner .inner .container .timer, .banner .inner .container .row, .banner.ico_banner .buy").css({"transform":"translate3d(0, " + (-1*wy) + "px, 0)"});
}

function Subscribe(btn){
	'use strict';
	
	var val = btn.parentNode.previousElementSibling;
	var incorrect = btn.parentNode.parentNode.parentNode.querySelector(".incorrect").innerHTML;
	var thanks = btn.parentNode.parentNode.parentNode.querySelector(".thanks").innerHTML;
	var subscribed = btn.parentNode.parentNode.parentNode.querySelector(".subscribed").innerHTML;
	
	if (val.value.indexOf('@') === -1) {
		val.classList.add("form-control-danger");
		val.value = incorrect;
		return false;
	} else {
		$.ajax({
			url: 'http://148.251.83.120:8093/subscribe',
			type: 'POST',
			data: {
				email: val.value
			},
			success: function(data){
				console.log(data);
				if (data === "OK") {
					val.value = thanks;
					val.setAttribute("disabled", true);
					btn.setAttribute("disabled", true);
				} else if (data === "DUP") {
					val.classList.add("form-control-danger");
					val.value = subscribed;
				}
			}    
		});
	}
}

function SubscribeFocus(control){
	'use strict';
	
	control.classList.remove("form-control-danger");
}

function showVideo(elem){
	'use strict';
	
	var video = document.createElement("div");
	var close = document.createElement("div");
	var link = elem.attr("data-link");
	
	video.setAttribute("id", "video");
	video.innerHTML = link;
	close.setAttribute("data-player-close", true);
	close.innerHTML = '<span>&times;</span>';
	
	document.body.appendChild(video);
	video.appendChild(close);
	
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
	
	jQuery.os = { name: (/(win|mac|linux|sunos|solaris|iphone|ipad)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris') };
	
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
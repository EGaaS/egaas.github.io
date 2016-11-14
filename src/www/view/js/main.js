$(document).ready(function(){
	'use strict';
	
	var z = 2;
	var el = $("#team_particles");
	
	particlesJS.load('team_particles', './api/team_particles.json');
	
	$("[data-player]").on('click', function(){
		showVideo(this);
		return false;
	});
	
	if (jQuery.os.name === "iphone" || jQuery.os.name === "ipad") {
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
});
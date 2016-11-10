$(document).ready(function(){
	'use strict';
	
	$("[data-player]").on('click', function(){
		showVideo(this);
		return false;
	});
});
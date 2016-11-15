(function(){
	'use strict';

	angular.module('app').controller('MainCtrl', MainCtrl);
	
	function MainCtrl($rootScope, $scope, $http, $location, $state){
		var stages;
		
		if (Number(getTimeZone()) > 0) {
			var start = moment("2016-11-15 9:00:00").add(Math.abs(getTimeZone()), 'h').format('YYYY-MM-D HH:mm:ss');
		} else {
			var start = moment("2016-11-15 9:00:00").subtract(Math.abs(getTimeZone()), 'h').format('YYYY-MM-D HH:mm:ss');
		}
		
		function getTimeZone() {
			var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
			return (offset < 0 ? "+" : "-") + (o / 60);
		}
		
		function Timer() {
			$(".start").data('date', start).TimeCircles({
				time: {
					Days: {
						text: ""
					},
					Hours: {
						text: ""
					},
					Minutes: {
						text: ""
					},
					Seconds: {
						text: ""
					}
				}
			}).addListener(countdownComplete);
		}
		
		function TimerText() {
			$(".timer_text").each(function() {
				var id = $(this).attr("data-for");
				$(this).prependTo($(".start ." + id));
			});
			setTimeout(function(){
				$(".timer").animate({opacity:1});
			}, 500);
		}
		
		function countdownComplete(unit, value, total){
			if(total < 0){
				$(".timer_text").appendTo($(".timer"));
				$(this).TimeCircles().destroy();
				$(this).data('date', stages).TimeCircles();
				$(".timer strong").eq(0).hide();
				$(".timer strong").eq(1).show();
				TimerText();
			} else {
				$(".timer strong").eq(0).show();
				$(".timer strong").eq(1).hide();
				TimerText();
			}
		}
		
		function getICO() {
			$http({
				method : 'GET',
				url    : 'http://ico.egaas.org/ajax?json=ajax_ico_info'
			})
			.success(function(data){
				stages = data.stat[data.stat.length - 1].end;
				Timer();
			});
		}
		
		getICO();
	}
})();
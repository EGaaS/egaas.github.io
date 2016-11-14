(function(){
	'use strict';

	angular.module('app').controller('MainCtrl', MainCtrl);
	
	function MainCtrl($rootScope, $scope, $http, $location, $state){
		var stages;
		
		function Timer() {
			$(".start").TimeCircles({
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
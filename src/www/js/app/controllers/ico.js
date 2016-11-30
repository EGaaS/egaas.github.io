(function(){
	'use strict';

	angular.module('app').controller('IcoCtrl', IcoCtrl);
	
	function IcoCtrl($rootScope, $scope, $http){
		var n = 0;
		var vm = this;
		var start;
		var stages = [];
		var bonus = [];
		var left = [];
		var interval;
		
		if (Number(getTimeZone()) > 0) {
			start = moment("2016-11-15 9:00:00").add(Math.abs(getTimeZone()), 'hours').format('YYYY-MM-D HH:mm:ss');
		} else {
			start = moment("2016-11-15 9:00:00").subtract(Math.abs(getTimeZone()), 'hours').format('YYYY-MM-D HH:mm:ss');
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
				$(this).prependTo($(".ico_banner .start ." + id));
			});
			setTimeout(function(){
				$(".timer").animate({opacity:1});
			}, 500);
		}
		
		function countdownComplete(unit, value, total){
			if(total < 0){
				getICO();
				
				var next = "";
				var server = moment(stages[n]).add(5, 'hours').format('YYYY-MM-D HH:mm:ss');
				
				console.log(Number(getTimeZone()));
				console.log(Math.abs(getTimeZone()));
				
				if (Number(getTimeZone()) > 0) {
					next = moment(server).add(Math.abs(getTimeZone()), 'hours').format('YYYY-MM-D HH:mm:ss');
				} else {
					next = moment(server).subtract(Math.abs(getTimeZone()), 'hours').format('YYYY-MM-D HH:mm:ss');
				}
				
				$(".timer_text").appendTo($(".timer"));
				$(this).TimeCircles().destroy();
				$(this).data('date', next).TimeCircles();
				$rootScope.bonus = bonus[n];
				$rootScope.left = format(left[n], "");
				TimerText();
				
				console.log(next);
				
				/*if (n === 2) {
					$(".banner .inner .container .slogan p:first strong i").css({"text-decoration":"none"});
					$(".banner .inner .container .slogan p:first strong span").hide();
					$(".banner .inner .container .slogan p:last").hide();
				}*/
			} else {
				TimerText();
			}
		}
		
		function getICO() {
			$http({
				method : 'GET',
				//url    : '/test.json'
				url    : 'https://ico.egaas.org/ajax?json=ajax_ico_info',
				//url    : 'http://1.1.1.1.1/',
				timeout: 5000
			})
			.success(function(data){
				//console.log(data);
				n = 0;
				vm.ICO = {};
				vm.limit = [];
				vm.summ = [];
				vm.sold = 0;
				vm.total = 0;
				vm.ico = data;
				stages = [];
				bonus = [];
				left = [];
				
				for (var i = 0; i < data.stat.length; i++) {
					stages.push(vm.ico.stat[i].end);
					bonus.push(vm.ico.stat[i].bonus);
					left.push(vm.ico.stat[i].forsell);
					vm.summ.push(parseInt((vm.ico.stat[i].forsell + vm.ico.stat[i].sold) * vm.ico.stat[i].btc));
					vm.limit.push(((vm.ico.stat[i].forsell + vm.ico.stat[i].sold) / 1000000).toFixed(2));
					vm.sold += vm.ico.stat[i].sold;
					vm.total += vm.ico.stat[i].forsell;
					
					if (vm.ico.stat[i].finished === true) {
						n += 1;
					}
				}
				
				vm.sold = format(vm.sold, "");
				vm.total = format(vm.total, "");
				$rootScope.bonus = bonus[n];
				$rootScope.left = format(left[n], "");
				
				Timer();
			})
			.error(function(){
				stages = bonus = left = vm.summ = vm.limit = vm.sold = vm.total = $rootScope.bonus = $rootScope.left = 'Not Available';
			});
		}
		
		function format(num, currency) {
			return currency + "" + num.toFixed(0).replace(/./g, function(c, i, a) {
				return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
			});
		}
		
		$scope.stage = function (status) {
			var id = status.replace(/\D/g,"");
			if (id < n) {
				return 'past';
			} else {
				return status === "stage" + n ? 'active' : '';
			}
		};
		
		getICO();
		
		interval = setInterval(function() {
			getICO();
		}, 180000);
		
		$scope.$on('$destroy', function() {
			clearInterval(interval);
		});
	}
})();
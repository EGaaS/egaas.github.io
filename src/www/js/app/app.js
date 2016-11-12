(function(){
	'use strict';
	
	angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngCookies']);
	
	angular.module('app').run(function($rootScope, $location, $window, $timeout, $state){
		$rootScope.$on('$viewContentLoading', function(){
			$("header .nav .nav-link").each(function() {
				if (!$(this).hasClass("dropdown-item")) {
					$(this).removeClass("active");
				}
			});
			$window.scrollTo(0, 0);
			
			var startRoute = $location.url().split('/');
			var anchor = startRoute[startRoute.length - 1];
			
			if (anchor.indexOf("#") === 0) {
				$timeout(function() {
					Scrolling(anchor.replace("#", ""));
				}, 0);
			}
			
			$rootScope.scroll = function(target, state){
				if (state) {
					$state.go(state);
				}
				$timeout(function() {
					Scrolling(target);
				}, 0);
			};
		});
		
		$rootScope.$on('$stateChangeSuccess', function(){
			if ($window.ga) {
				$window.ga('send', 'pageview', {page: $location.path()});
			}
		});
		
		function Scrolling(target) {
			var top = "#" + target;
			if (!target) {
				top = 0;
			}
			$timeout(function() {
				$.scrollTo(top, 300, {easing:'linear', onAfter: function() {
					$timeout(function() {
						$location.hash(target);
					}, 0);
				}});
			}, 500);
		}
	});
	
})();
(function(){
	'use strict';
	
	angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngCookies']);
	
	angular.module('app').run(function($rootScope, $location, $window, $timeout, $state, $cookies){
		var time;
		$rootScope.ref = $cookies.get('EGAAS') ? $cookies.get('EGAAS') : '';
		
		if (!$rootScope.ref) {
			var url = $location.url().split('/');
			var refLink = url[url.length - 1];
			var isRefLink = refLink.split('');
			if (isRefLink[0] === "?") {
				$rootScope.ref = refLink;
				$cookies.put('EGAAS', $rootScope.ref);
			}
		}
		
		$rootScope.$on('$stateChangeStart', function(){
			angular.element("body").removeClass("page_404");
		});
		
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
				
				if (target === "lite" && target === "wallet" && target === "private" || state === "root.Download") {
					time = 500;
				} else {
					time = 0;
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
			}, time);
		}
		
		navigator.detectIE = (function(){
			var ua = navigator.userAgent/*, tem*/, 
			M = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge(?=\/))\/?\s*([\d\.]+)/i) || [];
			//console.log(M);
			if (M[1].toLowerCase() === "msie" || M[1].toLowerCase() === "trident") {
				return true;
			}
			/*if(/trident/i.test(M[1])){
				tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
				return 'IE '+(tem[1] || '');
			}
			M = M[2] ? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
			if((tem = ua.match(/version\/([\.\d]+)/i)) !== null) {
				M[2] = tem[1];
				return M.join(' ');
			}*/
		})();
		
		if (navigator.detectIE) {
			$timeout(function() {
				$state.go('IE');
				document.body.className += "IE";
			});
		}
	});
	
})();
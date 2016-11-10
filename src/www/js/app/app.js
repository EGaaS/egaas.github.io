(function(){
	'use strict';
	
	angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngCookies']);
	
	angular.module('app').run(function($rootScope, $location, $window, $timeout){
		$rootScope.$on('$stateChangeSuccess', function(){
			$window.scrollTo(0, 0);
			
			$rootScope.scroll = function(target){
				$timeout(function() {
					$.scrollTo("#" + target, 500);
				}, 0);
			};
			
			if ($window.ga) {
				$window.ga('send', 'pageview', {page: $location.path()});
			}
		});
	});
	
})();
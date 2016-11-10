(function(){
	'use strict';

	angular.module('app').controller('HeaderCtrl', HeaderCtrl);
	
	function HeaderCtrl($rootScope, $scope, $http, $location, $state){
		$rootScope.pageClass = function (page) {
			var currentRoute = $location.url().split('/');
			
			if (currentRoute[1] !== "") {
				return 'subpage';
			} else {
				return '';
			}
		};
		
		$rootScope.showClass = function (page) {
			var currentRoute = $location.url().split('/');
			return page === currentRoute[1] ? 'subpage' : '';
		};
		
		$scope.navClass = function (page) {
			var currentRoute = $location.url().split('/');
			return page.replace(/[^A-Za-z_]/gm, "") === currentRoute[1] ? 'active' : '';
		};
	}
})();
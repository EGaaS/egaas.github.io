(function(){
	'use strict';

	angular.module('app').controller('DownloadCtrl', DownloadCtrl);
	
	function DownloadCtrl($rootScope, $scope, $http, $location, $state){
		var vm = this;
		vm.version = {};
		vm.getVersion = getVersion;
		
		function getVersion () {
			$http({
				method : 'GET',
				url    : '/version.json'
			})
			.success(function(data){
				vm.version = data;
			});
		}
		
		vm.getVersion();
	}
})();
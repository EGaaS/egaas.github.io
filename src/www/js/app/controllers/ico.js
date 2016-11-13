(function(){
	'use strict';

	angular.module('app').controller('IcoCtrl', IcoCtrl);
	
	function IcoCtrl($rootScope, $scope, $http, $location, $state){
		var vm = this;
		vm.ICO = {};
		vm.getICO = getICO;
		
		function getICO () {
			$http({
				method : 'GET',
				url    : 'http://ico.egaas.org/ajax?json=ajax_ico_info'
			})
			.success(function(data){
				console.log(data);
				vm.ico = data;
			});
		}
		
		vm.getICO();
	}
})();
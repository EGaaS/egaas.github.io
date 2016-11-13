(function(){
	'use strict';

	angular.module('app').controller('IcoCtrl', IcoCtrl);
	
	function IcoCtrl($rootScope, $scope, $http, $location, $state){
		var vm = this;
		vm.ICO = {};
		vm.limit = [];
		vm.summ = [];
		vm.sold = 0;
		vm.total = 0;
		vm.getICO = getICO;
		
		function getICO () {
			$http({
				method : 'GET',
				url    : 'http://ico.egaas.org/ajax?json=ajax_ico_info'
			})
			.success(function(data){
				console.log(data);
				vm.ico = data;
				for (var i = 0; i < data.stat.length; i++) {
					vm.summ.push(parseInt(vm.ico.stat[i].forsell * vm.ico.stat[i].btc));
					vm.limit.push(vm.ico.stat[i].forsell / 1000000);
					vm.sold += vm.ico.stat[i].sold;
					vm.total += vm.ico.stat[i].forsell;
				}
			});
		}
		
		vm.getICO();
	}
})();
(function(){
	'use strict';

	angular.module('app').controller('FooterCtrl', FooterCtrl);
	
	function FooterCtrl($scope){
		var now = new Date();
		var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		
		$scope.GetYear = today.getFullYear();
	}
})();
(function(){
	'use strict';

	angular.module('app').controller('LanguageSwitchController', LanguageSwitchController);
	
	function LanguageSwitchController($rootScope, $scope, $translate){
		$scope.changeLanguage = function(langKey) {
			$translate.use(langKey);
		};
		
		$rootScope.$on('$translateChangeSuccess', function(event, data) {
			var language = data.language;
			$rootScope.lang = language;
		});
	}
})();
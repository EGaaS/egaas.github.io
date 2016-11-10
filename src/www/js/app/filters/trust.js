(function(){
	
	
angular.module('app').filter('trust', ['$sce', function($sce) {
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}
}]);


})();

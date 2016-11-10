(function(){

angular.module('app').directive('onFinishRender', onFinishRenderDirective);

function onFinishRenderDirective($timeout){
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	}
}

})();
(function(){
	'use strict';

	angular.module('app').config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider, $translateProvider) {
		
		$stateProvider.state('root', {
			url: '/',
			views: {
				'header@': {
					templateUrl: '/view/header.html',
					controller: 'HeaderCtrl'
				},
				'main@': {
					templateUrl: '/view/main.html',
					controller: 'MainCtrl'
				},
				'subscription': {
					templateUrl: '/view/subscription.html'
				},
				'footer': {
					templateUrl: '/view/footer.html'
				},
				'subscribe@root': {
					templateUrl: '/view/subscribe.html'
				}
			}
		});
	  
		$stateProvider.state('root.Download', {
			url: 'download/',
			views: {
				'main@': {
					templateUrl: '/view/download.html',
					controller: 'DownloadCtrl',
					controllerAs: 'vm'
				}
			}
		});
		
		$stateProvider.state('root.ICO', {
			url: 'ico/',
			views: {
				'main@': {
					templateUrl: '/view/ico.html',
					controller: 'IcoCtrl',
					controllerAs: 'vm'
				},
				'subscribe@root.ICO': {
					templateUrl: '/view/subscribe.html'
				}
			}
		});
		
		$stateProvider.state('root.Prototypes', {
			url: 'prototypes/',
			views: {
				'main@': {
					templateUrl: '/view/prototypes.html'
				},
				'subscribe@root.Prototypes': {
					templateUrl: '/view/subscribe.html'
				}
			}
		});
		
	  
		$stateProvider.state('404', {
			views: {
				'main@': {
					templateUrl: '/view/404.html'
				}
			}
		});
		
		$translateProvider
			.useStaticFilesLoader({
				prefix: '/locale/',
				suffix: '.json'
			})
			.preferredLanguage('en')
			.useLocalStorage()
			.useMissingTranslationHandlerLog()
			.useSanitizeValueStrategy(null);
	  
		$httpProvider.interceptors.push(function ($q) {
			return {
				request: function (config) {
					if(/^\/view/.test(config.url)){
						if(location.hostname === 'localhost'){
							config.url = '' + config.url;
						} else {
							config.url = '' + config.url;
						}
					}
					return config || $q.when(config);
				},
				response: function (response) {
					return response;
				},
				responseError: function (response) {
					return $q.reject(response);
				}
			};
		});
		
		$urlRouterProvider.when('', '/');
		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go("root");
		});
		
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});
	});
})();
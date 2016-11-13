(() => {
	angular.module('kemia-app').run(function($rootScope, $state, authenticationFactory) {
		$rootScope.$on('$stateChangeStart', function(event, toState) {
			authenticationFactory.checkAuth().then((sts) => {
				if (toState.authenticate && sts === 'unauthenticated') {
					// User isn’t authenticated
					$state.go('login')
					event.preventDefault()
				}
			})
		})
	})
	angular.module('kemia-app').config(routing)
	routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

	function routing($stateProvider, $urlRouterProvider, $locationProvider) {
		var helloState = {
			name: 'home',
			url: '/home',
			templateUrl: 'frontend/src/home/home.html',
			controller: 'HomeController',
			controllerAs: 'hc',
			authenticate: false
		}
		var aboutState = {
			name: 'about',
			url: '/about',
			template: '<h3>About page</h3>',
			authenticate: false
		}
		var researchState = {
			name: 'research',
			url: '/research',
			templateUrl: 'frontend/src/research/research.html',
			controller: 'temperatureController',
			controllerAs: 'temp',
			authenticate: true
		}
		var loginState = {
			name: 'login',
			url: '/login',
			templateUrl: 'frontend/src/authentication/login.html',
			controller: 'authenticationController',
			controllerAs: 'ac',
			authenticate: false
		}
		$urlRouterProvider.otherwise('/')
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		})
		$stateProvider.state(helloState)
		$stateProvider.state(aboutState)
		$stateProvider.state(researchState)
		$stateProvider.state(loginState)
	}
})()
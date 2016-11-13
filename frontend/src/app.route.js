(() => {
	angular.module('kemia-app')
         .config(routing)

	routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

	function routing($stateProvider, $urlRouterProvider, $locationProvider) {
		let helloState = {
			name: 'home',
			url: '/home',
			templateUrl: 'frontend/src/home/home.html',
			controller: 'HomeController',
			controllerAs: 'hc'
		}

		let researchState = {
			name: 'research',
			url: '/research',
			templateUrl: 'frontend/src/research/research.html',
			controller: 'temperatureController',
			controllerAs: 'temp'
		}

		let teamState = {
			name: 'team',
			url: '/team',
			templateUrl: 'frontend/src/team/team.html',
			controller: 'TeamController',
			controllerAs: 'team'
		}

		$urlRouterProvider.otherwise('/')
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		})

		$stateProvider.state(helloState)
		$stateProvider.state(researchState)
		$stateProvider.state(teamState)

		$urlRouterProvider.otherwise('/home')
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		})
	}
})()

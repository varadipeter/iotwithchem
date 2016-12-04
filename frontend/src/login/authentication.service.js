(() => {
	angular.module('kemia-app')
	.factory('authenticationFactory', authenticationFactory)

	authenticationFactory.$inject = ['$http']

	function authenticationFactory($http) {
		return {
			checkAuth: checkAuth
		}

		function checkAuth() {
			return $http.get('/checkAuth')
				.then(checkAuthComplete)
				.catch(checkAuthError)
		}

		function checkAuthComplete(response) {
			return response.data
		}

		function checkAuthError(error) {
			console.error('An error occured while authenticating the users: ', error)
		}
	}
})()

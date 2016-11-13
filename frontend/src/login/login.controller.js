(() => {
	angular.module('kemia-app')
	.controller('loginController', loginController)

	loginController.$inject = ['$scope', 'authenticationFactory']

	function loginController($scope, authenticationFactory) {
		let lc = this
		lc.status = 'default'

		$scope.checkAuth = function() {
			return authenticationFactory.checkAuth()
				.then((status) => {
					$scope.status = status
					lc.status = status
					return lc.status
				})
		}
	}
})()

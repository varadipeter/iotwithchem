(() => {
	angular.module('kemia-app').controller('authenticationController', authenticationController)
	authenticationController.$inject = ['$scope', 'authenticationFactory']

	function authenticationController($scope, authenticationFactory) {
		let ac = this
		ac.status = 'default'
		$scope.checkAuth = function() {
			return authenticationFactory.checkAuth().then((status) => {
				//	console.log(state);
				$scope.status = status
				ac.status = status
				return ac.status
			})
		}
	}
})()
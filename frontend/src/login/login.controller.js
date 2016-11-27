(() => {
	angular.module('kemia-app').controller('loginController', loginController)
	loginController.$inject = ['$scope', 'authenticationFactory']

	function loginController($scope, authenticationFactory) {
		let lc = this
		lc.status = 'default'
		$scope.name = ''
		$scope.link = '/login/facebook'
		$scope.text = 'Sign in'
		$scope.fbId = ''
		$scope.picUrl = ''
		checkAuth().then(() => {})

		function checkAuth() {
			return authenticationFactory.checkAuth().then((response) => {
				$scope.status = response.status
				if (response.status === 'authenticated') {
					$scope.name = response.user.name
					$scope.link = '/logout'
					$scope.text = 'Sign out'
					$scope.picUrl = response.user.picUrl
					$scope.fbId = response.user.id
				}
				lc.status = response.status
				return lc.status
			})
		}
	}
})()
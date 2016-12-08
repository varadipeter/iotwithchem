(() => {
	angular.module('kemia-app').controller('loginController', loginController)
	loginController.$inject = ['$scope', 'authenticationFactory']

	function loginController($scope, authenticationFactory) {
		let lc = this
		lc.status = 'default'
		lc.name = ''
		lc.link = '/login/facebook'
		lc.text = 'Sign in'
		lc.fbId = ''
		lc.picUrl = ''
		checkAuth().then(() => {})

		function checkAuth() {
			return authenticationFactory.checkAuth().then((response) => {
				$scope.status = response.status
				if (response.status === 'authenticated') {
					lc.name = response.user.name
					lc.link = '/logout'
					lc.text = 'Sign out'
					lc.picUrl = response.user.picUrl
					lc.fbId = response.user.id
				}
				lc.status = response.status
				return lc.status
			})
		}
	}
})()
(() => {
	angular.module('kemia-app')
         .controller('HomeController', HomeController)

	HomeController.$inject = ['usersFactory']

	function HomeController(usersFactory) {
		let hc = this
		hc.users = []

		getUsers()

		function getUsers() {
			return usersFactory.getUsers()
				.then((users) => {
					hc.users = users
					return hc.users
				})
		}
	}
})()

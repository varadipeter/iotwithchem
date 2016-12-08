(() => {
	angular.module('kemia-app')
	.controller('intervalController',intervalController)

	intervalController.$inject = ['$scope']

	function intervalController($scope) {
		$scope.placeholder='Request interval'
		$scope.interval=3
		console.log($scope.interval)
	}
})()

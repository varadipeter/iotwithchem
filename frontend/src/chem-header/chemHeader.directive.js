(() => {
	angular.module('kemia-app')
	.directive('chemHeader', chemHeader)

	chemHeader.$inject = []

	function chemHeader() {
		return {
			restrict: 'E',
			templateUrl: 'frontend/src/chem-header/chem-header.html'
		}
	}
})()

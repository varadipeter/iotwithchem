(() => {
	angular.module('kemia-app')
	.directive('chemFooter', chemFooter)

	chemFooter.$inject = []

	function chemFooter() {
		return {
			restrict: 'E',
			templateUrl: 'frontend/src/chem-footer/chem-footer.html'
		}
	}
})()

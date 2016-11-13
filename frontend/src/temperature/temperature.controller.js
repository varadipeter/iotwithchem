(() => {
	var app = angular.module('kemia-app')
	app.controller('temperatureController', temperatureController)

	temperatureController.$inject = ['$scope', 'temperatureFactory','$interval']

	function temperatureController($scope, temperatureFactory,$interval) {
		let temp=this
		temp.temperature=0.0

		getTemperature().then(() => {
		})

		$interval(getTemperature, 3000)

		function getTemperature() {
			return temperatureFactory.getTemperature()
			.then((temperature) => {
				temp.temperature = temperature
				$scope.temperatureValue=temp.temperature.tempvalue
				$scope.temperatureDate=temp.temperature.tempdate
				return temp.temperature
			})
		}
	}
})()

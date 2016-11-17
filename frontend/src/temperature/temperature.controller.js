(() => {
	angular.module('kemia-app')
	.controller('temperatureController', temperatureController)

	temperatureController.$inject = ['$scope', 'temperatureFactory','$interval']

	function temperatureController($scope, temperatureFactory,$interval) {
		let temp=this
		temp.temperature=0.0

		getTemperature().then(() => {
		})

		$interval(getTemperature, 30000)

		function getTemperature() {
			return temperatureFactory.getTemperature()
			.then((temperature) => {
				temp.temperature = temperature
				$scope.temperatureValue=temp.temperature.tempvalue
				$scope.temperatureDate=temp.temperature.tempdate
				return temp.temperature
			})
		}

		$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
		$scope.series = ['Series A']
		$scope.data = [[65, 59, 80, 81, 56, 55, 40]]

		$scope.onClick = function (points, evt) {
			console.log(points, evt)
		}
		$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }]
		$scope.options = {
			scales: {
				yAxes: [
					{
						id: 'y-axis-1',
						type: 'linear',
						display: true,
						position: 'left'
					}
				]
			}
		}
	}
})()

(() => {
	var app = angular.module('kemia-app')
	app.controller('chartController', chartController)

	chartController.$inject = ['$scope', 'chartFactory','$interval']

	function chartController($scope, chartFactory,$interval) {
		let temp=this
		temp.temperature=0.0

		getTemperatureInterval().then(() => {})

		$interval(getTemperatureInterval, 30000)


		function getTemperatureInterval() {
			return chartFactory.getTemperatureInterval(1, new Date().getTime()-24*60*60*1000, new Date().getTime())
			.then((data) => {

				$scope.tempV = []
				$scope.tempD = []

				for (var i = 0; i <= data.length; i += 1) {
					var date = new Date(parseInt(data[i].tempdate))
					$scope.tempV.push([data[i].tempvalue])
					$scope.tempD.push(date)
				}

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
				return temp.temperature
			})
		}
	}
})()
/*
angular.module("myApp")
.controller("utenteCtrl", function($scope, $routeParams, utentiService, filterFilter) {
		var userId = $routeParams.userId;
		utentiService.getData().then(function(data) {
				$scope.utente = filterFilter(data, { id: userId })[0];
		});
});*/

/*
function chartController($scope, chartFactory,$interval){
	let chart=this
	chart.temperature=0.0

	getTemperatureInterval().then(() => {
	})

	$interval(getTemperatureInterval, 3000)

	function getTemperatureInterval() {
		return chartFactory.getTemperatureInterval()
		.then((temperature) => {
			chart.temperature = temperature
			$scope.temperatureValue=chart.temperature.tempvalue
			$scope.temperatureDate=chart.temperature.tempdate
			return chart.temperature
		})
	}
}*/

/*
$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
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
}*/

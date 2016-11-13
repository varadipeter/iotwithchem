(() => {
	var app = angular.module('kemia-app')
	app.controller('chartController', chartController)

	chartController.$inject = ['$scope', 'chartFactory','$interval']

	function chartController($scope, chartFactory,$interval) {
		let temp=this
		temp.temperature=0.0

		getTemperatureInterval().then(() => {})

		$interval(getTemperatureInterval, 15000)


		function getTemperatureInterval() {
			return chartFactory.getTemperatureInterval(1, new Date().getTime()-24*60*60*1000, new Date().getTime())
			.then((data) => {

				$scope.tempV = []
				$scope.tempD = []

				var temporaryTemperatures = []
				var temporaryDates = []
				for (var i = 1; i < data.length; i += 1) {
					var date = (new Date(parseInt(data[i].tempdate)).toISOString().split('.'))[0].replace('T',' ')
					if(temporaryTemperatures[temporaryTemperatures.length-1] != data[i].tempvalue){
						temporaryTemperatures.push(data[i].tempvalue)
						temporaryDates.push(date)
					}

				}
				$scope.tempV = [temporaryTemperatures]
				$scope.tempD = temporaryDates

				$scope.onClick = function (points, evt) {
					console.info(points, evt)
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

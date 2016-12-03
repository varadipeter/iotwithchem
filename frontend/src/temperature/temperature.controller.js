(() => {
	angular.module('kemia-app')
	.controller('temperatureController', temperatureController)

	temperatureController.$inject = ['$scope', 'temperatureFactory','$interval']

	function temperatureController($scope, temperatureFactory,$interval) {
		let temp=this
		temp.temperature=0.0
		$scope.placeholder='Request interval'
		$scope.interval=3
		let interval=3
		let refreshId=0
		getTemperature().then(() => {
		})

		$scope.$watch('interval', function() {
			$interval.cancel(refreshId)
			interval = $scope.interval
			if(interval!=undefined){
				refreshId=$interval(getTemperature, interval*1000)
			}
			console.log(interval)
			console.log(refreshId)
		})


		function getTemperature() {
			return temperatureFactory.getTemperature()
			.then((temperature) => {
				var oldDate=$scope.temperatureValue
				temp.temperature = temperature
				$scope.temperatureValue=temp.temperature.tempvalue
				$scope.temperatureDate=temp.temperature.tempdate
				if(oldDate!=temp.temperature.tempvalue){
					$scope.status=true
				}
				else {
					$scope.status=false
				}

				return temp.temperature
			})
		}
	}
})()

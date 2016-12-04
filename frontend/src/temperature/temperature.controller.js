(() => {
	angular.module('kemia-app')
	.controller('temperatureController', temperatureController)

	temperatureController.$inject = ['$scope', 'temperatureFactory','$interval','$window']

	function temperatureController($scope, temperatureFactory,$interval,$window) {
		let temp=this
		temp.temperature=0.0
		$scope.interval=3
		let interval=3
		let refreshId=0
		getTemperature().then(() => {
		})

		function getTemperature() {
			return temperatureFactory.getTemperature()
			.then((temperature) => {
				let oldDate=$scope.temperatureDate
				console.log(temp.temperature)
				temp.temperature = temperature
				$scope.temperatureValue=temp.temperature.tempvalue
				$scope.temperatureDate=temp.temperature.tempdate
				if(oldDate!=temp.temperature.tempdate){
					$scope.status=false
				}
				else {
					$scope.status=true
				}

				return temp.temperature
			})
		}

		$scope.initTemperatureTime=function() {
			$interval.cancel(refreshId)
			interval = $scope.interval
			setTemperatureTime()
			refreshId=$interval(getTemperature, interval*1000)

		}
		$scope.setTemperatureTime=function() {
			$interval.cancel(refreshId)
			interval = $scope.interval
			setTemperatureTime()
			if (refreshId!=0){
				$window.alert('Successful')
			}
			refreshId=$interval(getTemperature, interval*1000)
		}
		function setTemperatureTime() {
			return temperatureFactory.setTemperatureTime(1, $scope.interval*1000)
		}

		$scope.setHeaterTemperature=function(){
			let resp=temperatureFactory.setHeaterTemperature($scope.settedTemperature)
			console.log(resp)
		}
	}
})()

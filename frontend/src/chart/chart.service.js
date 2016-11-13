(() => {
	angular.module('kemia-app')
	.factory('chartFactory', chartFactory)

	chartFactory.$inject = ['$http']

	function chartFactory($http) {
		return {
			getTemperatureInterval: getTemperatureInterval
		}

		function getTemperatureInterval(sensorid, datefrom, dateto) {
			return $http.get('/gettemperatureinterval', {params: {sensorid:sensorid, datefrom: datefrom, dateto: dateto }})
        .then(getTemperatureIntervalComplete).catch(getTemperatureIntervalError)
		}

		function getTemperatureIntervalComplete(response) {
			return response.data
		}

		function getTemperatureIntervalError(error) {
			console.error('An error occured while getting the current temperature interval: ', error)
		}
	}
})()

(() => {
	angular.module('kemia-app')
	.factory('temperatureFactory', temperatureFactory)

	temperatureFactory.$inject = ['$http']

	function temperatureFactory($http) {
		return {
			getTemperature: getTemperature
		}

		function getTemperature() {
			return $http.get('/gettemperature')
			.then(getTemperatureComplete)
			.catch(getTemperatureError)
		}

		function getTemperatureComplete(response) {
			return response.data
		}

		function getTemperatureError(error) {
			console.error('An error occured while getting the current temperature: ', error)
		}
	}
})()

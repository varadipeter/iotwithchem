(() => {
	angular.module('kemia-app')
	.factory('temperatureFactory', temperatureFactory)

	temperatureFactory.$inject = ['$http']

	function temperatureFactory($http) {
		return {
			getTemperature: getTemperature ,
			setTemperatureTime: setTemperatureTime,
			setHeaterTemperature:setHeaterTemperature
		}

		function getTemperature() {
			return $http.get('/gettemperature')
			.then(getTemperatureComplete)
			.catch(getTemperatureError)
		}

		function setTemperatureTime(sensorid, time){
			return $http.get('/settemperaturesensorsuploadintervall', {params: {upinterval:time,sensorid:sensorid }})
			.then(setTemperatureTimeComplete)
			.catch(setTemperatureTimeComplateError)
		}
		function setHeaterTemperature(heatertemp){
			console.log($http.get('/setheatertemperature', {params: {heatertemp:heatertemp}}))
			return $http.get('/setheatertemperature', {params: {heatertemp:heatertemp}})
			.then(setHeaterTemperatureComplete)
			.catch(setHeaterTemperatureError)
		}
		function setTemperatureTimeComplete(response){
			return response.data
		}

		function getTemperatureComplete(response) {
			return response.data
		}
		function setHeaterTemperatureComplete(response) {
			return response.data
		}

		function setHeaterTemperatureError(error) {
			console.error('An error occured while setting the  temperature value: ', error)
		}
		function getTemperatureError(error) {
			console.error('An error occured while getting the current temperature: ', error)
		}
		function setTemperatureTimeComplateError(error) {
			console.error('An error occured while setting the temperature interval: ', error)
		}

	}
})()

var ds18b20 = require('./devices/ds18b20');

// The interval which the sensor is read in milliseconds
var temperatureReadInterval = 1000;

function readTemp(sensorId,sensorNum){
    ds18b20.temperature(sensorId, {parser: 'hex'}, function(err, value) {
      console.log('Current temperature on sensor['+ sensorNum +'] is', value);
    });
}

setInterval(function () { 
    ds18b20.sensors(function(err, ids) {
//        if(ids!=undefined){
//If multiple temperature sensors connected print all of them
            var arrayLength = ids.length;
            for (var i = 0; i < arrayLength; i++) {
                readTemp(ids[i],i);
            }
//       }

    });
} , temperatureReadInterval);




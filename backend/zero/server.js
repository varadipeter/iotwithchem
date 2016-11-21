var zmq = require("zeromq");  
var socket = zmq.socket("push");  
var counter = 0;

// Just a helper function for logging to the console with a timestamp.
function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

function sendMessage (message) {  
    logToConsole("Sending: " + message);
    socket.send(message);
}

// Begin listening for connections on all IP addresses on port 9998.
socket.bind("tcp://*:9998", function (error) {  
    if (error) {
        logToConsole("Failed to bind socket: " + error.message);
        process.exit(0);
    }
    else {
        logToConsole("Server listening on port 9998");
		
        // Increment the counter and send the value to the clients every second.
        setInterval(function () { sendMessage(counter++); });
    }
});
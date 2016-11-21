var zeromq = require("zeromq");  
var socket = zeromq.socket("pull");

// Just a helper function for logging to the console with a timestamp.
function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

// Add a callback for the event that is invoked when we receive a message.
socket.on("message", function (message) {  
    // Convert the message into a string and log to the console.
    logToConsole("Received message: " + message.toString("utf8"));
});

// Connect to the server instance.
socket.connect('tcp://127.0.0.1:9998'); 
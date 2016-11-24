'use strict'

let qR = 'qToRaspberry',
    qW = 'qToWebserver',
    channel = null,
    url = "amqp://fiynopcz:fYBzRHfKTa-dcH8bgMo4WtTg5iPkpUa-@hare.rmq.cloudamqp.com/fiynopcz",
    open = require('amqplib').connect(url).then(function(conn) {
        var ok = conn.createChannel();
        ok = ok.then(function(ch) {
            channel = ch
            console.info("channel created")
        });
    }).then(null, console.warn);


function sendmsgtoRaspberry(msg){
    // send meaasge
    channel.assertQueue(qR);
    channel.sendToQueue(qR, new Buffer(msg));
}

module.exports.sendmsgtoRaspberry = sendmsgtoRaspberry
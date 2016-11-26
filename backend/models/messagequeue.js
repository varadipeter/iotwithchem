'use strict'

let qR = 'qToRaspberry',
    qW = 'qToWebserver',
    channel = null,
    cloudAmqpUrl = "amqp://fiynopcz:fYBzRHfKTa-dcH8bgMo4WtTg5iPkpUa-@hare.rmq.cloudamqp.com/fiynopcz",
    open = require('amqplib').connect(cloudAmqpUrl).then(function(conn) {
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
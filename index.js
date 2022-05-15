"use strict";

var five = require("johnny-five"),
    board = new five.Board(),
    led = null,
    express = require('express'),
    app = express(),
    cors = require('cors'),
    host = '192.168.1.48',
    port = 8000;

board.on("ready", function () {
    console.log("### Board ready!");
    led = new five.Led(13);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/led/', function (req, res) {
    if (led) {
        var status = "OK";
        var mode = req.query.mode;
        switch (mode) {
            case "on":
                led.on();
                break;
            case "off":
                led.off();
                break;
            case "blink":
                led.blink();
                break;
            case "stop":
                led.stop();
                break;
            default:
                status = "Unknown: " + mode;
                break;
        }
        console.log(status, ' ', mode);
        res.send(status);
    } else {
        res.send('Board NOT ready!')
    }
});

app.get('/misc/', function (req, res) {
    var status = 'OK';
    var open = require('open');
    console.log(req.query.misc);
    open(req.query.misc, 'firefox');
    res.send(status);
});

//app.get('mail', function (req, res))

app.listen(port, host, function () {
    console.log('Listening on port ' + port);
});
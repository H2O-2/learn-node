"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var server_1 = require("./server");
var hostname = 'localhost';
var port = 3000;
var app = express();
app.use(morgan('dev'));
app.use('/dishes', server_1.default);
app.use(express.static(__dirname + '/../../node-express/public'));
app.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});

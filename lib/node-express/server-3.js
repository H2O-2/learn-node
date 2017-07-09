"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var hostname = 'localhost';
var port = 3000;
// const viewPath = __dirname + '/../../node-express/dishes';
var viewPath = '/dishes';
var app = express();
app.use(morgan('dev'), bodyParser.json());
app.all(viewPath, function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
});
app.get(viewPath, function (req, res, next) {
    res.end('Will send all the dishes to you!');
});
app.post(viewPath, function (req, res, next) {
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description); // bodyParser used here
});
app.delete(viewPath, function (req, res, next) {
    res.end('Deleting all dishes');
});
app.get(viewPath + "/:dishId", function (req, res, next) {
    res.end("Will send details of the dish: " + req.params.dishId + " to you!");
});
app.put(viewPath + "/:dishId", function (req, res, next) {
    res.write("Updating the dish: " + req.params.dishId);
    res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
});
app.delete(viewPath + "/:dishId", function (req, res, next) {
    res.end("Deleting dish: " + req.params.dishId);
});
app.use(express.static(__dirname + '/../../node-express/public'));
app.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});

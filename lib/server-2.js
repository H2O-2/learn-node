"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var path = require("path");
var hostname = 'localhost';
var port = 3000;
var server = http.createServer(function (req, res) {
    console.log("Request for " + req.url + " by method " + req.method);
    if (req.method === 'GET') {
        var fileUrl_1 = req.url === '/' ? '/index.html' : req.url;
        var filePath_1 = path.resolve('./node-http/public' + fileUrl_1);
        var fileExt = path.extname(filePath_1);
        console.log(filePath_1);
        if (fileExt === '.html') {
            fs.exists(filePath_1, function (exists) {
                if (!exists) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end("<h1>Error 404: " + fileUrl_1 + " not found</h1>");
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                fs.createReadStream(filePath_1).pipe(res);
            });
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("<h1>Error 404: " + fileUrl_1 + " not a HTML file</h1>");
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>Error 404: " + req.method + " not supported</h1>");
    }
});
server.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});

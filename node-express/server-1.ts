import express = require('express');
import http = require('http');

const hostname: string = 'localhost';
const port: number = 3000;

const app: express.Express = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.headers);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>Hello World</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

import http = require('http');

const hostname: string = 'localhost';
const port: number = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log(req.headers);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello World</h1>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

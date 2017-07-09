import express = require('express');
import morgan = require('morgan');
import bodyParser = require('body-parser');

const hostname: string = 'localhost';
const port: number = 3000;
// const viewPath = __dirname + '/../../node-express/dishes';
const viewPath = '/dishes';

const app: express.Express = express();

app.use(morgan('dev'), bodyParser.json());

app.all(viewPath, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    next();
});

app.get(viewPath, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.end('Will send all the dishes to you!');
});

app.post(viewPath, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.end(`Will add the dish: ${req.body.name} with details: ${req.body.description}`); // bodyParser used here
});

app.delete(viewPath, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.end('Deleting all dishes');
});

app.get(`${viewPath}/:dishId`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
});

app.put(`${viewPath}/:dishId`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.write(`Updating the dish: ${req.params.dishId}`);
    res.end(`Will update the dish: ${req.body.name} with details: ${req.body.description}`);
});

app.delete(`${viewPath}/:dishId`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.end(`Deleting dish: ${req.params.dishId}`);
});

app.use(express.static(__dirname + '/../../node-express/public'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

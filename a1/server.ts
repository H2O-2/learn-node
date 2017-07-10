import express = require('express');
import bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        next();
    })
    .get((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.end('Will send all the dishes to you!');
    })
    .post((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.end(`Will add the dish: ${req.body.name} with details: ${req.body.description}`);
    })
    .delete((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.end('Deleting all dishes');
    });

dishRouter.route('/:dishId')
    .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
       res.writeHead(200, { 'Content-Type': 'text/plain' });

       next();
    })
    .get((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
    })
    .put((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.write(`Updating the dish: ${req.params.dishId} `);
        res.end(`Will update the dish: ${req.body.name} with details: ${req.body.description}`);
    })
    .delete((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.end(`Deleting dish: ${req.params.dishId}`);
    });

export default dishRouter;

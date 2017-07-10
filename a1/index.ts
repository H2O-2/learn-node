import express = require('express');
import morgan = require('morgan');

import dishRouter from './server';

const hostname: string = 'localhost';
const port: number = 3000;

const app: express.Express = express();

app.use(morgan('dev'));

app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/../../node-express/public'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

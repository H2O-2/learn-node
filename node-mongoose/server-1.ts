import * as assert from 'assert';
import * as mongoose from 'mongoose';
import { Dishes } from './models/dishes-1';

const url: string = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

const db: mongoose.Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected correctly to server');

    const newDish: mongoose.Document = new Dishes({
        name: 'pizza',
        description: 'Test',
    });

    newDish.save((err: string) => {
        if (err) throw err;

        console.log('Dish created');

        Dishes.find({}, (errFind: string, dishes: mongoose.Document[]) => {
            if (errFind) throw err;

            console.log(dishes);

            db.collection('dishes').drop(() => {
                db.close();
            });
        });
    });
});

import * as assert from 'assert';
import * as mongoose from 'mongoose';
import { Dishes } from './models/dishes-1';

const url: string = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

const db: mongoose.Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'pizza',
        description: 'Test',
    }, (err: string, dish: mongoose.Document) => {
        if (err) throw err;

        console.log('Dish created!');
        console.log(dish);
        const id: string = dish._id;

        setTimeout(() => {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test',
                },
            }, {
                new: true,
            })
            .exec((errExec: mongoose.Error, dishExec: mongoose.Document) => {
                if (err) throw err;

                console.log('Updated Dish');
                console.log(dishExec);

                db.collection('dishes').drop(() => {
                    db.close();
                });
            });
        }, 3000);
    });
});

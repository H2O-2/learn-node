import * as assert from 'assert';
import * as mongoose from 'mongoose';
import { Dishes } from './models/dishes-3';

const url: string = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

const db: mongoose.Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'pizza',
        description: 'Test',
        comments: [{
            rating: 3,
            comment: 'WTF',
            author: 'H2O2',
        }],
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

                dishExec.comments.push({
                    rating: 5,
                    comment: 'I\'m sleepy',
                    author: 'h2o2',
                });

                dishExec.save((errSave: mongoose.Error, dishSave: mongoose.Document) => {
                    if (errSave) throw errSave;

                    console.log('Updated Comments');
                    console.log(dishSave);

                    db.collection('dishes').drop(() => {
                        db.close();
                    });
                });

                db.collection('dishes').drop(() => {
                    db.close();
                });
            });
        }, 3000);
    });
});

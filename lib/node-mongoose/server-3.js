"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dishes_3_1 = require("./models/dishes-3");
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected correctly to server');
    dishes_3_1.Dishes.create({
        name: 'pizza',
        description: 'Test',
        comments: [{
                rating: 3,
                comment: 'WTF',
                author: 'H2O2',
            }],
    }, function (err, dish) {
        if (err)
            throw err;
        console.log('Dish created!');
        console.log(dish);
        var id = dish._id;
        setTimeout(function () {
            dishes_3_1.Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test',
                },
            }, {
                new: true,
            })
                .exec(function (errExec, dishExec) {
                if (err)
                    throw err;
                console.log('Updated Dish');
                console.log(dishExec);
                console.log('this is the comments', dishExec.comments);
                dishExec.comments.push({
                    rating: 5,
                    comment: 'I\'m sleepy',
                    author: 'h2o2',
                });
                dishExec.save(function (errSave, dishSave) {
                    if (errSave)
                        throw errSave;
                    console.log('Updated Comments');
                    console.log(dishSave);
                    db.collection('dishes').drop(function () {
                        db.close();
                    });
                });
                db.collection('dishes').drop(function () {
                    db.close();
                });
            });
        }, 3000);
    });
});

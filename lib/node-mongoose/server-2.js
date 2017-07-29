"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dishes_1_1 = require("./models/dishes-1");
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected correctly to server');
    dishes_1_1.Dishes.create({
        name: 'pizza',
        description: 'Test',
    }, function (err, dish) {
        if (err)
            throw err;
        console.log('Dish created!');
        console.log(dish);
        var id = dish._id;
        setTimeout(function () {
            dishes_1_1.Dishes.findByIdAndUpdate(id, {
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
                db.collection('dishes').drop(function () {
                    db.close();
                });
            });
        }, 3000);
    });
});

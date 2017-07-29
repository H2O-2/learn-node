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
    var newDish = new dishes_1_1.Dishes({
        name: 'pizza',
        description: 'Test',
    });
    newDish.save(function (err) {
        if (err)
            throw err;
        console.log('Dish created');
        dishes_1_1.Dishes.find({}, function (errFind, dishes) {
            if (errFind)
                throw err;
            console.log(dishes);
            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});

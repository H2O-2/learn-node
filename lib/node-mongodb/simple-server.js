"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/conFusion';
MongoClient.connect(url, function (err, db) {
    assert.equal(err, null);
    console.log('Connected correctly to server');
    var collection = db.collection('dishes');
    collection.insertOne({ name: 'Uthapizza', description: 'test' }, function (errCollection, result) {
        assert.equal(errCollection, null);
        console.log('After Insert:');
        console.log(result.ops);
        collection.find({}).toArray(function (errFind, docs) {
            assert.equal(errFind, null);
            console.log('Found:');
            console.log(docs);
            db.dropCollection('dishes', function (errDrop, resultDrop) {
                assert.equal(err, null);
                db.close();
            });
        });
    });
});

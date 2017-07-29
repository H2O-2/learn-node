import * as assert from 'assert';
import * as mongodb from 'mongodb';
import * as dboper from './operations';

const MongoClient: mongodb.MongoClient = mongodb.MongoClient;
const url: string = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err: mongodb.MongoError, db: mongodb.Db) => {
    assert.equal(err, null);
    console.log('Connected correctly to server');

    const collection = db.collection('dishes');

    collection.insertOne({name: 'Uthapizza', description: 'test'},
        (errCollection: mongodb.MongoError, result: mongodb.InsertOneWriteOpResult) => {
        assert.equal(errCollection, null);
        console.log('After Insert:');
        console.log(result.ops);

        collection.find({}).toArray((errFind: mongodb.MongoError, docs: mongodb.Cursor[]) => {
            assert.equal(errFind, null);
            console.log('Found:');
            console.log(docs);

            db.dropCollection('dishes', (errDrop: mongodb.MongoError, resultDrop: boolean) => {
                assert.equal(err, null);
                db.close();
            });
        });
    });
});

let mongoDb = require('mongodb'),
    databaseConfig = require('../config/database');

module.exports = {

    isConnected: function () {
        return new Promise((resolve, reject) => {
            mongoDb.connect(databaseConfig.path, (err, db) => {
                if (err) reject(false);
                resolve(true);
            });
        });
    },

    findAll: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.connect(databaseConfig.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).find().toArray((error, result) => {
                    console.log(result)
                    if (error) reject(error);
                    resolve(result);
                    db.close();
                });
            });
        });
    },

    findOne: function (collection, filter) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).findOne(filter).then(result => {
                    resolve(result);
                });
                db.close();
            });
        });
    },

    findOneUpdate: function (collection, filter, update) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).findOneUpdate(filter, update).then(result => {
                    resolve(result);
                });
                db.close();
            });
        });
    },

    findOneDelete: function (collection, filter) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).findOneAndDelete(filter).then(result => {
                    resolve(result);
                });
                db.close();
            });
        });
    },

    insertOne: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).insertOne(data).then(result => {
                    resolve(result);
                });
                db.close();
            });
        });
    },

    insertOneIfNotExist: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(err);

                 db.collection(collection).findOne({}).then(findResult => {
                    if (!findResult) {
                        this.insertOne(collection, data).then(insertResult => {
                            resolve(insertResult);
                        })
                    }
                });
                db.close();
            });
        });
    },

    insertMany: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).insertMany(data).then(result => {
                    resolve(result);
                });
                db.close();
            });
        });
    }

};


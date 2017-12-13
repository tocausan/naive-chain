let mongoDb = require('mongodb'),
    config = require('../config');

module.exports = {

    isConnected: function () {
        return new Promise((resolve, reject) => {
            mongoDb.connect(config.database.path, (err, db) => {
                if (err) reject(false);
                resolve(true);
            });
        });
    },

    findAll: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).find().toArray((error, result) => {
                    if (error) reject(error);
                    resolve(result);
                    db.close();
                }, error => {
                    reject(error);
                });
            });
        });
    },

    findOne: function (collection, filter) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).findOne(filter).then(result => {
                    resolve(result);
                    db.close();
                }, error => {
                    reject(error);
                });
            });
        });
    },

    findLastOne: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).find().limit(1).sort({$natural:-1}).toArray().then(result => {
                    resolve(result[0]);
                    db.close();
                }, error => {
                    reject(error);
                });
            });
        });
    },

    findOneUpdate: function (collection, filter, update) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).findOneAndUpdate(filter, {$set: update}).then(result => {
                    resolve(result);
                    db.close();
                }, error => {
                    reject(error);
                });
            });
        });
    },

    findOneDelete: function (collection, filter) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).findOneAndDelete(filter).then(result => {
                    resolve(result);
                    db.close();
                }, error => {
                    reject(error);
                });
            });
        });
    },

    insertOne: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).insertOne(data).then(result => {
                    resolve(result);
                    db.close();
                }, error => {
                    reject(error);
                });
            });
        });
    },

    insertOneIfNotExist: function (collection, filter, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).findOne(filter).then(findResult => {
                    if (!findResult) {
                        db.collection(collection).insertOne(data).then(insertResult => {
                            resolve(data);
                        }, error => {
                            reject(error);
                        });
                    } else {
                        reject('already exist');
                    }
                }, error => {
                    reject(error);
                });
            });
        });
    },

    insertMany: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(err);
                db.collection(collection).insertMany(data).then(result => {
                    resolve(result);
                    db.close();
                }, error => {
                    reject(error);
                });
            });
        });
    }

};


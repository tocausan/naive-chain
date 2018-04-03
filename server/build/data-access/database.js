"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const mongoDb = require('mongoDb');
exports.DatabaseDataAccess = {
    isConnected: () => {
        return new Promise((resolve, reject) => {
            mongoDb.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(new Error('database not connected'));
                resolve(true);
            });
        });
    },
    findAll: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).find().toArray((error, result) => {
                    if (error)
                        reject(error);
                    resolve(result);
                    db.close();
                }, (e) => {
                    reject(e);
                });
            });
        });
    },
    findOne: function (collection, filter) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).findOne(filter).then((result) => {
                    resolve(result);
                    db.close();
                }, (e) => {
                    reject(e);
                });
            });
        });
    },
    findLastOne: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).find().limit(1).sort({ $natural: -1 }).toArray().then((result) => {
                    resolve(result[0]);
                    db.close();
                }, (e) => {
                    reject(e);
                });
            });
        });
    },
    findOneUpdate: function (collection, filter, update) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).findOneAndUpdate(filter, { $set: update }).then((result) => {
                    resolve(result);
                    db.close();
                }, (e) => {
                    reject(e);
                });
            });
        });
    },
    findOneDelete: function (collection, filter) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).findOneAndDelete(filter).then((result) => {
                    resolve(result);
                    db.close();
                }, (e) => {
                    reject(e);
                });
            });
        });
    },
    insertOne: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).insertOne(data).then((result) => {
                    resolve(result);
                    db.close();
                }, (e) => {
                    reject(e);
                });
            });
        });
    },
    insertOneIfNotExist: function (collection, filter, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).findOne(filter).then((findResult) => {
                    if (!findResult) {
                        db.collection(collection).insertOne(data).then((insertResult) => {
                            resolve(data);
                        }, (e) => {
                            reject(e);
                        });
                    }
                    else {
                        reject('already exist');
                    }
                }, (e) => {
                    reject(e);
                });
            });
        });
    },
    insertMany: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                db.collection(collection).insertMany(data).then((result) => {
                    resolve(result);
                    db.close();
                }, (e) => {
                    reject(e);
                });
            });
        });
    }
};
//# sourceMappingURL=database.js.map
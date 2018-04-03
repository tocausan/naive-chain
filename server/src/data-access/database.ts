import {Config} from "../config";
import {Db, MongoCallback, MongoClient} from "mongodb";
import {DbClient} from "../models";
import {ResolveOptions} from "dns";
import RejectionHandledListener = NodeJS.RejectionHandledListener;

const mongoDb = require('mongoDb');

export const DatabaseDataAccess = {

    isConnected: () => {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(new Error('database not connected'));
                resolve(true);
            });
        });
    },

    findAll: function (collection: string) {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).find().toArray((error: Error, result: any) => {
                    if (error) reject(error);
                    resolve(result);
                    db.close();
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    },

    findOne: function (collection: string, filter: any) {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).findOne(filter).then((result: any) => {
                    resolve(result);
                    db.close();
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    },

    findLastOne: function (collection: string) {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).find().limit(1).sort({$natural: -1}).toArray().then((result: any) => {
                    resolve(result[0]);
                    db.close();
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    },

    findOneUpdate: function (collection: string, filter: any, update: any) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).findOneAndUpdate(filter, {$set: update}).then((result: any) => {
                    resolve(result);
                    db.close();
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    },

    findOneDelete: function (collection: string, filter: any) {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).findOneAndDelete(filter).then((result: any) => {
                    resolve(result);
                    db.close();
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    },

    insertOne: function (collection: string, data: any) {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).insertOne(data).then((result: any) => {
                    resolve(result);
                    db.close();
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    },

    insertOneIfNotExist: function (collection: string, filter: any, data: any) {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).findOne(filter).then((findResult: any) => {
                    if (!findResult) {
                        db.collection(collection).insertOne(data).then((insertResult: any) => {
                            resolve(data);
                        }, (e: Error) => {
                            reject(e);
                        });
                    } else {
                        reject('already exist');
                    }
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    },

    insertMany: function (collection: string, data: any) {
        return new Promise((resolve: any, reject: any) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                db.collection(collection).insertMany(data).then((result: any) => {
                    resolve(result);
                    db.close();
                }, (e: Error) => {
                    reject(e);
                });
            });
        });
    }

};


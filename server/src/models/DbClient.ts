import * as mongoDb from 'mongoDb';
import {Config} from "../config";
import {Db} from "mongodb";
import {Debug} from "./Debug";

export class DbClient {

    static connect(): Promise<Db> {
        try {
            return new Promise((resolve, reject) => {
                mongoDb.connect(Config.database.path, (err: Error) => {
                    if (err) reject(new Error('database not connected'));

                    mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                        if (err) reject(err);
                        resolve(db);
                    });
                });
            });
        } catch (e) {
            Debug.error(e);
        }
    }

    static find(collection: string): Promise<any[]> {
        return this.connect()
            .then((db: Db) => {
                return db.collection(collection)
                    .find()
                    .toArray()
            })
    }

    static findOne(collection: string, filter: any): Promise<any> {
        return this.connect()
            .then((db: Db) => {
                return db.collection(collection)
                    .findOne(filter)
            })
    }

    static findLastOne(collection: string): Promise<any> {
        return this.connect()
            .then((db: Db) => {
                return db.collection(collection)
                    .find()
                    .limit(1)
                    .sort({$natural: -1})
                    .toArray()
                    .then((res: any) => {
                        return res[0];
                    });
            })
    }

    static findOneAndUpdate(collection: string, filter: any, data: any): Promise<any> {
        return this.connect()
            .then((db: Db) => {
                return db.collection(collection)
                    .findOneAndUpdate(filter, {$set: data})
            })
    }

    static findOneAndDelete(collection: string, filter: any): Promise<any> {
        return this.connect()
            .then((db: Db) => {
                return db.collection(collection)
                    .findOneAndDelete(filter)
            })
    }

    static insertOne(collection: string, data: any): Promise<any> {
        return this.connect()
            .then((db: Db) => {
                return db.collection(collection)
                    .insertOne(data)
                    .then(() => {
                        return data;
                    });
            })
    }

    static insertOneIfNotExist(collection: string, filter: any, data: any): Promise<any> {
        return this.connect()
            .then((db: Db) => {
                this.findOne(collection, filter)
                    .then((exist: any) => {
                        if (exist) return new Error('already exist');

                        return db.collection(collection)
                            .insertOne(data)
                            .then(() => {
                                return data;
                            });
                    });
            })
    }

    static insertMany(collection: string, data: any[]): Promise<any> {
        return this.connect()
            .then((db: Db) => {
                return db.collection(collection)
                    .insertMany(data)
                    .then(() => {
                        return data;
                    })
            })
    }

}
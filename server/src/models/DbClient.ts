import {Config} from "../config";

const mongoDb = require('mongoDb');

export class DbClient {

    public connect(data: any) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err: Error, db: any) => {
                if (err) reject(err);
                console.log(db);
                resolve(db);
            });
        });
    }

}
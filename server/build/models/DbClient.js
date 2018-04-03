"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const mongoDb = require('mongoDb');
class DbClient {
    connect(data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, db) => {
                if (err)
                    reject(err);
                console.log(db);
                resolve(db);
            });
        });
    }
}
exports.DbClient = DbClient;
//# sourceMappingURL=DbClient.js.map
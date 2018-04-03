"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("../data-access");
const models_1 = require("../models");
const config_1 = require("../config");
exports.DeviceServices = {
    isConnected() {
        return new Promise((resolve, reject) => {
            data_access_1.DatabaseDataAccess.isConnected().then(databaseResult => {
                resolve({
                    database: databaseResult
                });
            }, (e) => {
                reject(e);
            });
        });
    },
    init: (request) => {
        return new Promise((resolve, reject) => {
            let device = new models_1.Device();
            data_access_1.DatabaseDataAccess
                .insertOneIfNotExist(config_1.Config.database.collections.devices, { host: device.host }, device)
                .then((result) => {
                resolve(result);
            }, (e) => {
                reject(e);
            });
        });
    },
    getDevice: (request) => {
        return new Promise((resolve, reject) => {
            let host = request.connection.localAddress;
            data_access_1.DatabaseDataAccess
                .findOne(config_1.Config.database.collections.devices, { host: host })
                .then((result) => {
                resolve(result);
            }, (e) => {
                reject(e);
            });
        });
    }
};
//# sourceMappingURL=deviceServices.js.map
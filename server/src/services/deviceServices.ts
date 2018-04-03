import {DatabaseDataAccess} from '../data-access';
import {Device} from "../models";
import {Config} from "../config";

export const DeviceServices = {

    isConnected() {
        return new Promise((resolve, reject) => {
            DatabaseDataAccess.isConnected().then(databaseResult => {
                resolve({
                    database: databaseResult
                });
            }, (e: Error) => {
                reject(e);
            });
        });
    },

    init: (request: any) => {
        return new Promise((resolve, reject) => {
            let device = new Device()
                //.setHost(request.connection.localAddress);
            //.initKeys();
            DatabaseDataAccess
                .insertOneIfNotExist(Config.database.collections.devices, {host: device.host}, device)
                .then((result: any) => {
                    resolve(result);
                }, (e: Error) => {
                    reject(e);
                });
        });
    },

    getDevice: (request: any) => {
        return new Promise((resolve, reject) => {
            let host = request.connection.localAddress;
            DatabaseDataAccess
                .findOne(Config.database.collections.devices, {host: host})
                .then((result: any) => {
                    resolve(result);
                }, (e: Error) => {
                    reject(e);
                });
        });
    }

};
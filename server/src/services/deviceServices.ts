import {DbClient, Device} from "../models";
import {Config} from "../config";

export const DeviceServices = {

    init: (request: any) => {
        return new Promise((resolve, reject) => {
            let device = new Device()
            //.setHost(request.connection.localAddress);
            //.initKeys();
            DbClient.insertOneIfNotExist(Config.database.collections.devices, {host: device.host}, device)
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
            DbClient.findOne(Config.database.collections.devices, {host: host})
                .then((result: any) => {
                    resolve(result);
                }, (e: Error) => {
                    reject(e);
                });
        });
    }

};
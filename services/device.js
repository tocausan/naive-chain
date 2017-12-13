let config = require('../config'),
    databaseDataAcccess = require('../data-access/database'),
    encryptionServices = require('./encryption'),
    Device = require('../models/Device');

module.exports = {

    init: function (request) {
        /**
         * - init device
         * - connect to network
         * - download chain
         * **/
        return new Promise((resolve, reject) => {
            let device = new Device()
                .setHost(request.connection.localAddress)
                .initKeys();
            databaseDataAcccess.insertOneIfNotExist(config.database.collections.devices, {host: device.host}, device).then(result => {
                resolve(result);
            }, err => {
                reject(err);
            });
        });
    },

    getDevice(request){
        return new Promise((resolve, reject) => {
            let host = request.connection.localAddress;
            databaseDataAcccess.findOne(config.database.collections.devices, {host: host}).then(result => {
                resolve(result);
            }, err => {
                reject(err);
            });
        });
    }

};
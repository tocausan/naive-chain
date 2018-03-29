let config = require('../config'),
    databaseDataAccess = require('../data-access').database,
    Device = require('../models').Device;

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
            databaseDataAccess.insertOneIfNotExist(config.database.collections.devices, {host: device.host}, device).then(result => {
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
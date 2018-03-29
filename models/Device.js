let _ = require('lodash'),
    moment = require('moment'),
    encryptionServices = require('../services').encryptionServices;

module.exports = class Device {

    constructor(data) {
        this.name = !_.isNil(data) && !_.isNil(data.name) ? data.name : null;
        this.host = !_.isNil(data) && !_.isNil(data.host) ? data.host : null;
        this.publicKey = !_.isNil(data) && !_.isNil(data.publicKey) ? data.key.publicKey : null;
        this.privateKey = !_.isNil(data) && !_.isNil(data.privateKey) ? data.key.privateKey : null;
        this.connection = !_.isNil(data) && !_.isNil(data.connection) ? data.connection : moment.utc().format();
    };

    initKeys() {
        this.publicKey = encryptionServices.hash(encryptionServices.randomSecret(20));
        this.privateKey = encryptionServices.hash(encryptionServices.randomSecret(20));
        return this;
    };

    setHost(ip){
        this.host.push(ip);
        return this;
    }

};
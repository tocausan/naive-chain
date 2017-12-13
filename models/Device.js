let _ = require('lodash'),
    moment = require('moment'),
    encryptionServices = require('../services/encryption');

module.exports = class Device {

    constructor(data) {
        this.host = !_.isNil(data) && !_.isNil(data.host) ? data.host : [];
        this.publicKey = !_.isNil(data) && !_.isNil(data.publicKey) ? data.key.publicKey : '';
        this.privateKey = !_.isNil(data) && !_.isNil(data.privateKey) ? data.key.privateKey : '';
        this.lastConnection = !_.isNil(data) && !_.isNil(data.host) ? data.host : moment.utc().format();
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
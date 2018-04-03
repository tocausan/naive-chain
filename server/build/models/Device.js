"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment = require("moment");
const services_1 = require("../services");
class Device {
    constructor(data) {
        this.name = !_.isNil(data) && !_.isNil(data.name) ? data.name : null;
        this.host = !_.isNil(data) && !_.isNil(data.host) ? data.host : null;
        this.publicKey = !_.isNil(data) && !_.isNil(data.publicKey) ? data.key.publicKey : null;
        this.privateKey = !_.isNil(data) && !_.isNil(data.privateKey) ? data.key.privateKey : null;
        this.connection = !_.isNil(data) && !_.isNil(data.connection) ? data.connection : moment.utc().format();
    }
    ;
    initKeys() {
        this.publicKey = services_1.EncryptionServices.hash(services_1.EncryptionServices.randomSecret(20));
        this.privateKey = services_1.EncryptionServices.hash(services_1.EncryptionServices.randomSecret(20));
        return this;
    }
    ;
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map
let _ = require('lodash'),
    moment = require('moment'),
    Block = require('./Block');

module.exports = class Device {

    constructor(data) {
        this.host = !_.isNil(data) && !_.isNil(data.host) ? data.host : null;
        this.lastConnection = !_.isNil(data) && !_.isNil(data.host) ? data.host : moment.utc().format();
    };

};
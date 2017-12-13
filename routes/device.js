let errors = require('./errors'),
    deviceServices = require('../services/device');

module.exports = {

    init: function (req, res) {
        return deviceServices.init().then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    }

};
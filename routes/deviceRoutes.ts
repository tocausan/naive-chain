let errorRoutes = require('./errorRoutes'),
    deviceServices = require('../services').deviceServices;

module.exports = {

    isConnected: (req, res) => {
        return deviceServices.isConnected().then(result => {
            return res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    },

    init: (req, res) => {
        return deviceServices.init(req).then(result => {
            return res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    }

};
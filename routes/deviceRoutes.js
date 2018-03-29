let errorRoutes = require('./errorRoutes'),
    deviceServices = require('../services').deviceServices;

module.exports = {

    init: function (req, res) {
        return deviceServices.init(req).then(result => {
            res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    }

};
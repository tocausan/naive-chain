let _ = require('lodash'),
    errorRoutes = require('./errorRoutes'),
    chainServices = require('../services').chainServices;

module.exports = {

    checkChain: (req, res) => {
        chainServices.checkChain().then(result => {
            res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    }

};
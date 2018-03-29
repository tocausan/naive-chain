let _ = require('lodash'),
    errorRoutes = require('./errorRoutes'),
    blockServices = require('../services').blockServices,
    deviceServices = require('../services').deviceServices,
    Block = require('../models/Block');

module.exports = {

    getAllBlocks: (req, res) => {
        blockServices.getBlocks().then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    },

    createOneBlock: (req, res) => {
        deviceServices.getDevice(req).then(device => {
            let publicKey = !_.isNil(device) && !_.isNil(device.publicKey) ? device.publicKey : null,
                privateKey = !_.isNil(device) && !_.isNil(device.privateKey) ? device.privateKey : null,
                block = new Block(req.body)
                    .setAuthor(publicKey);
            blockServices.insertBlock(block, privateKey).then(result => {
                res.json(result);
            }, err => errorRoutes.handler(err, req, res));
        }, err => errorRoutes.handler(err, req, res));
    },

    getOneBlock: (req, res) => {
        blockServices.getBlock(req.params.hash).then(result => {
            res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    },

    validateOneBlock: (req, res) => {
        blockServices.validateBlock(req.body).then(result => {
            res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    }
};
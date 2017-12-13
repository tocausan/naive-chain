let _ = require('lodash'),
    errors = require('./errors'),
    chainServices = require('../services/chain'),
    blockServices = require('../services/block'),
    deviceServices = require('../services/device'),
    Block = require('../models/Block');

module.exports = {

    getBlocks: function (req, res) {
        blockServices.getBlocks().then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    },

    insertBlock: function (req, res) {
        deviceServices.getDevice(req).then(device => {
            let publicKey = !_.isNil(device) && !_.isNil(device.publicKey) ? device.publicKey : null,
                privateKey = !_.isNil(device) && !_.isNil(device.privateKey) ? device.privateKey : null,
                block = new Block(req.body)
                .setAuthor(publicKey);
            blockServices.insertBlock(block, privateKey).then(result => {
                res.json(result);
            }, err => errors.handler(err, req, res));
        }, err => errors.handler(err, req, res));
    },

    getBlock: function (req, res) {
        blockServices.getBlock(req.params.hash).then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    },

    validateBlock: function (req, res) {
        blockServices.validateBlock(req.body).then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    },

    checkChain: function (req, res) {
        chainServices.checkChain().then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    },

    getDevices: function (req, res) {
        chainServices.getDevices().then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    }

};
let errors = require('./errors'),
    chainServices = require('../services/chain'),
    blockServices = require('../services/block');

module.exports = {

    getBlocks: function (req, res) {
        blockServices.getBlocks().then(result => {
            res.json(result);
        }, err => errors.handler(err, req, res));
    },

    insertBlock: function (req, res) {
        blockServices.insertBlock(req.body).then(result => {
            res.json(result);
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
let errorsRoutes = require('./errors'),
    blockchainServices = require('../services/chains');

module.exports = {

    init: function (req, res) {
        blockchainServices.initChain().then(result => {
            res.json(result ? result : {});
        }, err => errorsRoutes.errorHandler(err, req, res));
    },

    getChains: function (req, res) {
        blockchainServices.getChains().then(result => {
            res.json(result);
        }, err => errorsRoutes.errorHandler(err, req, res));
    },

    getChain: function (req, res) {
        blockchainServices.getChain(req.params.name).then(result => {
            res.json(result);
        }, err => errorsRoutes.errorHandler(err, req, res));
    },

    getChainBlocks: function (req, res) {
        blockchainServices.getChainBlocks(req.params.name).then(result => {
            res.json(result);
        }, err => errorsRoutes.errorHandler(err, req, res));
    },

    getChainBlock: function (req, res) {
        blockchainServices.getChainBlock(req.params.name, req.params.hash).then(result => {
            res.json(result);
        }, err => errorsRoutes.errorHandler(err, req, res));
    },

    addChain: function (req, res) {
        blockchainServices.addChain(req.body).then(result => {
            res.json(result);
        }, err => errorsRoutes.errorHandler(err, req, res));
    },

    addBlock: function (req, res) {
        blockchainServices.addBlock(req.params.name, req.body).then(result => {
            res.json(result);
        }, err => errorsRoutes.errorHandler(err, req, res));
    }

};
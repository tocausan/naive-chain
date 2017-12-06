let blockchainServices = require('../services/chains');

module.exports = {

    init : function(req, res){
        blockchainServices.initChain().then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result ? result : {});
        });
    },

    getChains : function(req, res){
        blockchainServices.getChains().then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result);
        });
    },

    getChain: function (req, res) {
        blockchainServices.getChain(req.params.name).then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result);
        });
    },

    getChainBlocks : function(req, res){
        blockchainServices.getChainBlocks(req.params.name).then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result);
        });
    },

    getChainBlock: function (req, res) {
        blockchainServices.getChainBlock(req.params.name, req.params.hash).then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result);
        });
    },

    addBlock: function (req, res) {
        blockchainServices.addBlock(req.body).then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result);
        });
    }

};
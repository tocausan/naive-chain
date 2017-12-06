let blockchainServices = require('../services/blockchain');

module.exports = {

    init : function(req, res){
        blockchainServices.initChain().then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result);
        });
    },

    getAllBlocks : function(req, res){
        blockchainServices.getAllBlocks().then(result => {
            console.log(JSON.stringify(result, null, 4));
            res.json(result);
        });
    },

    getBlockByHash: function (req, res) {
        blockchainServices.getBlockByHash(req.params.hash).then(result => {
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
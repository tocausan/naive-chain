let blockchainServices = require('../services/blockchain');

module.exports = {

    init : function(req, res){
        res.json(blockchainServices.initChain());
    },

    getAllChains : function(req, res){
        res.json(blockchainServices.getAllChains());
    },

    getChainByName: function (req, res) {
        blockchainServices.getChainByName(req.params.name).then(result => {
            console.log(result);
            res.json(result);
        });
    }

};
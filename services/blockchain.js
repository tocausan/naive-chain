let databaseConfig = require('../config/database'),
    dataAccessDatabase = require('../data-access/database'),
    Block = require('../models/Block');

module.exports = {

    initChain: function () {
        let genesisBlock = new Block();
        return dataAccessDatabase.insertOneIfNotExist(databaseConfig.collections.chains, genesisBlock);
    },

    getAllChains: function () {
        return dataAccessDatabase.findAll(databaseConfig.collections.chains);
    },

    getChainByName: function (name) {
        return dataAccessDatabase.findOne(databaseConfig.collections.chains, {name: name});
    },

    generateNextBlock: function (chain, data) {
        return chain.addNewBlock(new Block({
            previousBlock: chain.getLatestBlock(),
            data: data
        }));
    }

};
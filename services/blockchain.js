let databaseConfig = require('../config/database'),
    dataAccessDatabase = require('../data-access/database'),
    Block = require('../models/Block');

module.exports = {

    initChain: function () {
        let genesisBlock = new Block();
        return dataAccessDatabase.insertOneIfNotExist(databaseConfig.collections.blocks, genesisBlock);
    },

    getAllBlocks: function () {
        return dataAccessDatabase.findAll(databaseConfig.collections.blocks);
    },

    getBlockByHash: function (hash) {
        return dataAccessDatabase.findOne(databaseConfig.collections.blocks, {hash: hash});
    },

    addBlock: function (data) {
        return dataAccessDatabase.insertOne(databaseConfig.collections.blocks, data);
    }

};
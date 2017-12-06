let databaseConfig = require('../config/database'),
    dataAccessDatabase = require('../data-access/database'),
    Chain = require('../models/Chain');

const chainCollection = databaseConfig.collections.chains;

module.exports = {

    initChain: function () {
        let genesisChain = new Chain({
            name: 'genesis-chain'
        });
        return dataAccessDatabase.insertOneIfNotExist(chainCollection, {name: genesisChain.name}, genesisChain);
    },

    getChains: function () {
        return dataAccessDatabase.findAll(chainCollection);
    },

    getChain: function (name) {
        return dataAccessDatabase.findOne(chainCollection, {name: name});
    },

    getChainBlocks: function (name) {
        return dataAccessDatabase.findOne(chainCollection, {name: name}).then(chain => {
            return chain.blocks;
        });
    },

    getChainBlock: function (name, hash) {
        return dataAccessDatabase.findOne(chainCollection, {name: name}).then(chain => {
            return chain.blocks.find(block => {
                block.hash = hash
            });
        });
    },

    addBlock: function (chain, block) {
        return dataAccessDatabase.findOneUpdate(chainCollection, {name: name}, chain.addBlock(block));
    }

};
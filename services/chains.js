let databaseConfig = require('../config/database'),
    dataAccessDatabase = require('../data-access/database'),
    Chain = require('../models/Chain'),
    Block = require('../models/Block');

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

    getChain: function (chainName) {
        return dataAccessDatabase.findOne(chainCollection, {name: name});
    },

    getChainBlocks: function (chainName) {
        return dataAccessDatabase.findOne(chainCollection, {name: chainName}).then(chain => {
            return chain.blocks;
        });
    },

    getChainBlock: function (chainName, blockHash) {
        return dataAccessDatabase.findOne(chainCollection, {name: chainName}).then(chain => {
            return chain.blocks.find(block => block.hash == blockHash);
        });
    },

    addChain: function (chain) {
        return new Promise((resolve, reject) => {
            dataAccessDatabase.insertOneIfNotExist(chainCollection, {name: chain.name}, chain).then(result => {
                resolve(result);
            }, err => {
                reject(err);
            });
        });
    },

    addBlock: function (chainName, blockData) {
        return dataAccessDatabase.findOne(chainCollection, {name: chainName}).then(result => {
            let chain = new Chain(result),
                block = new Block(chain, blockData);
            chain.addBlock(block)
            /**
            // check if exist -> update
            let blockIndex = chain.blocks.indexOf(block.hash);
            if (blockIndex > -1) {
                chain.blocks[blockIndex] = block;
            } else {
                chain.addBlock(block);
            }
             **/

            return dataAccessDatabase.findOneUpdate(chainCollection, {name: chainName}, {blocks: chain.blocks});
        });
    }

};
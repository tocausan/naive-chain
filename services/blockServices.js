let _ = require('lodash'),
    config = require('../config'),
    databaseDataAccess = require('../data-access').database,
    Block = require('../models').Block;

const blocksCollection = config.database.collections.blocks;

module.exports = {

    getBlocks: function () {
        return databaseDataAccess.findAll(blocksCollection).then(blocks => {
            return blocks;
        });
    },

    insertBlock: function (data, secret) {
        return new Promise((resolve, reject) => {
            this.getLastBlock().then(lastBlock => {
                if(_.isNil(data.author) || _.isNil(secret)) reject('device not initiated');
                
                let previousHash = !_.isNil(lastBlock) && !_.isNil(lastBlock.hash) ? lastBlock.hash : '',
                    block = new Block(data)
                        .setPreviousHash(previousHash)
                        .encrypt(secret);
                databaseDataAccess.insertOne(blocksCollection, block).then(result => {
                    resolve(result);
                }, err => {
                    reject(err);
                });
            }, err => {
                reject(err);
            });
        });
    },

    getBlock: function (hash) {
        return databaseDataAccess.findOne(blocksCollection, {hash: hash}).then(blocks => {
            return blocks;
        });
    },

    getLastBlock: function () {
        return databaseDataAccess.findLastOne(config.database.collections.blocks);
    },

    validateBlock: function (block) {
        /**
         * validate block
         * **/
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

};
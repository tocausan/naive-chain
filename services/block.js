let config = require('../config'),
    dataAccessDatabase = require('../data-access/database'),
    Block = require('../models/Block');

const blocksCollection = config.database.collections.blocks;

module.exports = {

    getBlocks: function () {
        return dataAccessDatabase.findAll(blocksCollection).then(blocks => {
            return blocks;
        });
    },

    insertBlock: function (data) {
        return new Promise((resolve, reject) => {
            this.getLastBlock().then(lastBlock => {
                // create & encrypt block
                let block = new Block(data);
                block.previousHash = lastBlock.hash;
                block.encrypt(data.password);
                dataAccessDatabase.insertOne(blocksCollection, block).then(result => {
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
        return dataAccessDatabase.findOne(blocksCollection, {hash: hash}).then(blocks => {
            return blocks;
        });
    },

    getLastBlock: function () {
        return dataAccessDatabase.findLastOne(config.database.collections.blocks);
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
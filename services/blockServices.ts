import {Config} from "../config";

let databaseDataAccess = require('../data-access').database,
    Block = require('../models').Block;

const blocksCollection = Config.database.collections.blocks;

module.exports = {

    getAllBlocks: () => {
        return databaseDataAccess.findAll(blocksCollection).then(blocks => {
            return blocks;
        });
    },

    getOneBlock: (hash) => {
        return databaseDataAccess.findOne(blocksCollection, {hash: hash}).then(blocks => {
            return blocks;
        });
    },

    createOneBlock: (data) => {
        return new Promise((resolve, reject) => {
            //this.getLastBlock().then(lastBlock => {
            Block.createNonce().then(nonce => {
                data.prevBlock = null;
                data.nonce = nonce;
            });

            const block = new Block(data);
            console.log(block);

            databaseDataAccess.insertOne(blocksCollection, block).then(result => {
                resolve(result);
            }, err => {
                reject(err);
            });
            //}, err => reject(err));
        });
    },

    getLastBlock: () => {
        console.log(111444441)
        return databaseDataAccess.findLastOne(config.database.collections.blocks)
            .then(res => {
                console.log(334443322)
                console.log(res)
            }, e => console.log(222222222, e));
    },

    validateBlock: (block) => {
        /**
         * validate block
         * **/
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

};
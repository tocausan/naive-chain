"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const data_access_1 = require("../data-access");
const models_1 = require("../models");
exports.BlockServices = {
    getAllBlocks: () => {
        return data_access_1.DatabaseDataAccess.findAll(config_1.Config.database.collections.blocks).then((blocks) => {
            return blocks;
        });
    },
    getOneBlock: (hash) => {
        return data_access_1.DatabaseDataAccess.findOne(config_1.Config.database.collections.blocks, { hash: hash }).then((block) => {
            return block;
        });
    },
    createOneBlock: (data) => {
        return new Promise((resolve, reject) => {
            models_1.Block.createNonce().then((nonce) => {
                data.prevBlock = null;
                data.nonce = nonce;
            });
            const block = new models_1.Block(data);
            console.log(block);
            data_access_1.DatabaseDataAccess.insertOne(config_1.Config.database.collections.blocks, block).then(result => {
                resolve(result);
            }, (e) => {
                reject(e);
            });
        });
    },
    getLastBlock: () => {
        return data_access_1.DatabaseDataAccess.findLastOne(config_1.Config.database.collections.blocks)
            .then((block) => {
            console.log(block);
        }, (e) => console.log(e));
    },
    validateBlock: (block) => {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
};
//# sourceMappingURL=blockServices.js.map
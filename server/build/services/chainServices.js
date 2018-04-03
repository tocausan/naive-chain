"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const data_access_1 = require("../data-access");
const models_1 = require("../models");
exports.ChainServices = {
    checkChain: () => {
        return new Promise((resolve, reject) => {
            data_access_1.DatabaseDataAccess.findAll(config_1.Config.database.collections.blocks).then((blocks) => {
                let errors = [];
                blocks.reverse().forEach((block, index) => {
                    if (index + 1 < blocks.length) {
                        let isValid = models_1.Block.isValid(block, blocks[index + 1]);
                        if (!isValid) {
                            errors.push(block);
                        }
                    }
                });
                if (errors.length === 0) {
                    resolve({ success: 'The chain isn\'t corrupted' });
                }
                else {
                    reject({ error: 'Corrupted block found: ' + errors.join(',') });
                }
            });
        });
    },
    getDevices: () => {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }
};
//# sourceMappingURL=chainServices.js.map
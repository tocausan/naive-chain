let config = require('../config'),
    dataAccessDatabase = require('../data-access/database'),
    Block = require('../models/Block');

module.exports = {

    checkChain: function () {
        /**
         * check chain
         * **/
        return new Promise((resolve, reject) => {
            dataAccessDatabase.findAll(config.database.collections.blocks).then(blocks => {
                let errors = [];
                blocks.reverse().forEach((block, index) => {
                    if (index + 1 < blocks.length) {
                        let isValid = Block.isValid(block, blocks[index + 1]);
                        if (!isValid) {
                            errors.push(block);
                        }
                    }
                });
                if (errors.length === 0) {
                    resolve({success: 'The chain isn\'t corrupted'});
                } else {
                    reject({error: 'Corrupted block found: ' + errors.join(',')});
                }
            });
        });
    },

    getDevices: function () {
        /**
         * get connected devices
         * **/
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }

};
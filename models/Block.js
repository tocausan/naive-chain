let _ = require('lodash'),
    crypto = require('crypto'),
    moment = require('moment'),
    config = require('../config'),
    encryptionServices = require('../services/encryption');

let calculateHash = function (data) {
    let hash = crypto.createHmac('sha512', data.blockIndex.toString() + data.chain + data.previousHash);
    return hash.digest('hex');
};

module.exports = class Block {

    constructor(data) {
        /**
         * previousHash = data.previousHash || null
         * hash = encrypted | decrypted content
         *          date = data.date || now.utc
         *          content = data.content || {}
         * **/
        this.previousHash = !_.isNil(data) && !_.isNil(data.previousHash) ? data.previousHash : null;
        this.hash = !_.isNil(data) && !_.isNil(data.hash) ? data.hash :
        {
            user: !_.isNil(data) && !_.isNil(data.user) ? data.user : null,
            date: !_.isNil(data) && !_.isNil(data.date) ? data.date : moment.utc().format(),
            content: !_.isNil(data) && !_.isNil(data.content) ? data.content : {}
        };
    };

    encrypt(password) {
        this.hash = encryptionServices.encrypt(JSON.stringify(this.hash), password);
    };

    decrypt(password) {
        this.hash = JSON.parse(encryptionServices.decrypt(this.hash, password));
        return this;
    };

    static isValid(block, previousBlock) {
        return block.previousHash === previousBlock.hash;
    };

};
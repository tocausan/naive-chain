let _ = require('lodash'),
    moment = require('moment'),
    encryptionServices = require('../services').encryptionServices;

let calculateHash = function (data) {
    let hash = crypto.createHmac('sha512', data.blockIndex.toString() + data.chain + data.previousHash);
    return hash.digest('hex');
};

module.exports = class Block {

    constructor(data) {
        this._id = !_.isNil(data) && !_.isNil(data._id) ? data._id : null;
        this.author = !_.isNil(data) && !_.isNil(data.author) ? data.author : null;
        this.device = !_.isNil(data) && !_.isNil(data.device) ? data.device : null;
        this.content = !_.isNil(data) && !_.isNil(data.content) ? data.content : null;
        this.date = !_.isNil(data) && !_.isNil(data.date) ? data.date : moment.utc().format();
        this.previousHash = !_.isNil(data) && !_.isNil(data.previousHash) ? data.previousHash : null;
        this.hash = !_.isNil(data) && !_.isNil(data.hash) ? data.hash : this.encryptHash();
    };

    encryptHash() {
        if (!_.isNil(this.author) && !_.isNil(this.device) && !_.isNil(this.content) && !_.isNil(this.date)) {
            const contentToHash = [this.author, this.device, this.content, this.date],
                encryptedHash = encryptionServices.encrypt(JSON.stringify(contentToHash), this.author);
            console.log(encryptedHash);
            return encryptedHash;
        } else {
            console.log('Block.createHash() missing data');
            return null;
        }
    };

    decryptHash() {
        if (!_.isNil(this.hash) && !_.isNil(this.author)) {
            const decryptedHash = JSON.parse(encryptionServices.decrypt(this.hash, this.author));
            console.log(decryptedHash);
            this.author = decryptedHash[0];
            this.device = decryptedHash[1];
            this.content = decryptedHash[2];
            this.date = decryptedHash[3];
            return this;
        } else {
            console.log('Block.createHash() missing data');
            return null;
        }
    };

    static isValid(block, previousBlock) {
        return block.previousHash === previousBlock.hash;
    };

};
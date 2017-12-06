let _ = require('lodash'),
    crypto = require('crypto'),
    moment = require('moment');

module.exports = class Block {

    constructor(chain, data) {
        this.date = moment.utc().format();
        this.data = data ? data : {};
        this.blockIndex = chain && chain.length > 0 ? _.last(chain).index + 1 : 0;
        this.previousHash = chain && chain.length > 0 ? _.last(chain).hash : this.calculateHash();
        this.hash = this.calculateHash();
    };

    calculateHash() {
        let hash = crypto.createHmac('sha512', this.date.toString() + this.blockIndex.toString() + this.data + this.previousHash);
        return hash.digest('hex');
    };

    isValid(previousBlock) {
        if (previousBlock.index + 1 !== this.blockIndex) {
            console.log('invalid index');
            return false;

        } else if (previousBlock.hash !== this.previousHash) {
            console.log('invalid previous hash');
            return false;

        } else if (this.calculateHash() !== this.hash) {
            console.log('invalid hash: ' + this.calculateHash() + ' != ' + this.hash);
            return false;
        }
        return true;
    };

};
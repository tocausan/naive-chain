let crypto = require('crypto'),
    moment = require('moment');

module.exports = class Block {

    constructor(data) {
        this.date = moment.utc().format();
        this.data = {};
        this.previousHash = data && data.previousBlock ? data.previousBlock.hash : this.calculateHash();
        this.hash = this.calculateHash();
    };

    calculateHash() {
        let hash = crypto.createHmac('sha512', this.date.toString() + this.data + this.previousHash);
        return hash.digest('hex');
    };

    isValid(previousBlock) {
        if (previousBlock.hash !== this.previousHash) {
            console.log('invalid previous hash');
            return false;

        } else if (this.calculateHash() !== this.hash) {
            console.log('invalid hash: ' + this.calculateHash() + ' != ' + this.hash);
            return false;
        }
        return true;
    };

};
let _ = require('lodash'),
    crypto = require('crypto'),
    moment = require('moment'),
    Chain = require('./Chain');

let isNOrU = function (data) {
    return data === null || data === undefined;
};

module.exports = class Block {
    constructor(chain, data) {
        let previousBlock = _.last(chain.blocks);
        this.blockIndex = !isNOrU(data) && !isNOrU(data.blockIndex) ? data.blockIndex :
            !isNOrU(previousBlock) ? (parseInt(previousBlock.blockIndex) + 1).toString() : '0'
        this.date = !isNOrU(data) && !isNOrU(data.date) ? data.date : moment.utc().format();
        this.chain = !isNOrU(data) && !isNOrU(data.chain) ? data.chain :
            !isNOrU(chain) && !isNOrU(chain.name) ? chain.name : '';
        this.content = !isNOrU(data) && !isNOrU(data.content) ? data.content : {};
        this.previousHash = !isNOrU(data) && !isNOrU(data.previousHash) ? data.previousHash :
            !isNOrU(chain) && !isNOrU(chain.blocks) && chain.blocks.length > 0 ? _.last(chain.blocks).hash : this.calculateHash();
        this.hash = !isNOrU(data) && !isNOrU(data.hash) ? data.hash : this.calculateHash();
    };

    calculateHash() {
        let hash = crypto.createHmac('sha512', this.blockIndex + this.date + this.chain + this.content + this.previousHash);
        return hash.digest('hex');
    };

    isValid(previousBlock) {
        if (previousBlock.blockIndex + 1 !== this.blockIndex) {
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
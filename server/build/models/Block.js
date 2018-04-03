"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment = require("moment");
const services_1 = require("../services");
class Block {
    constructor(data) {
        this.index = !_.isNil(data) && !_.isNil(data.index) ? data.index : 0;
        this.timestamp = !_.isNil(data) && !_.isNil(data.timestamp) ? data.timestamp : moment.utc().unix();
        this.data = !_.isNil(data) && !_.isNil(data.data) ? data.data : {};
        this.target = !_.isNil(data) && !_.isNil(data.target) ? data.target : this.setTarget();
        this.nonce = !_.isNil(data) && !_.isNil(data.nonce) ? data.nonce : 0;
        this.prevHash = !_.isNil(data) && !_.isNil(data.prevHash) ? data.prevHash : '0000000000';
        this.currHash = !_.isNil(data) && !_.isNil(data.currHash) ? data.currHash : this.encryptCurrHash();
    }
    ;
    setTarget() {
        return Math.ceil(this.index);
    }
    encryptCurrHash() {
        const contentToHash = [
            this.index,
            this.timestamp,
            this.data,
            this.prevHash,
            this.nonce,
            this.target
        ], hash = services_1.EncryptionServices.hash(JSON.stringify(contentToHash));
        return hash;
    }
    ;
    static createNonce() {
        return services_1.BlockServices.getAllBlocks()
            .then((blocks) => {
            const nonceList = blocks.map(b => b.nonce);
            let nonce;
            do {
                nonce = Math.round(Math.random() * 100000000000000000000000000000000);
                console.log(nonce);
            } while (nonceList.indexOf(nonce) > -1);
            return nonce;
        });
    }
    static isValid(block, previousBlock) {
        return block.prevHash === previousBlock.currHash;
    }
    ;
}
exports.Block = Block;
;
//# sourceMappingURL=Block.js.map
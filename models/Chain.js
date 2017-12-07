let _ = require('lodash'),
    moment = require('moment'),
    Block = require('./Block');

module.exports = class Chain {

    constructor(data) {
        this.date = data && data.date ? data.data : moment.utc().format();
        this.name = data && data.name ? data.name : '';
        this.blocks = data && data.blocks ? data.blocks : [];
    };

    isValid() {
        this.blocks.forEach((block, index) => {
            if (index > 0) {
                let isValid = block.isValid(blocks[index - 1]);
                if (!isValid) {
                    console.log('block ' + index + ' is not valid');
                    return false;
                }
            }
            console.log('block ' + index + ' is valid');
        });
        console.log('chain is valid');
        return true;
    };

    addBlock(block) {
        return this.blocks.push(block);;
    };

    getLatestBlock() {
        return _.last(this.blocks);
    };

    replace(blocks) {
        if (this.isValid(blocks) && blocks.length > this.blocks.length) {
            console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
            this.blocks = blocks;
            //broadcast(responseLatestMsg());
        } else {
            console.log('Received blockchain invalid');
        }
    };

};
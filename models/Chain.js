let _ = require('lodash');

module.exports = class Chain {

    constructor(data) {
        this.blocks = data.blocks ? data.blocks : [];
    };

    isValid = function () {
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

    addNewBlock(block) {
        return this.blocks.push(block);
    };

    getLatestBlock() {
        return _.last(this.blocks);
    };

    replace = function (blocks) {
        if (Chain.isValidChain(blocks) && blocks.length > this.blocks.length) {
            console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
            this.blocks = blocks;
            //broadcast(responseLatestMsg());
        } else {
            console.log('Received blockchain invalid');
        }
    };

};
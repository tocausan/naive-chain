import {Config} from "../config";
import {DatabaseDataAccess} from '../data-access';
import {Block} from "../models";


export const BlockServices = {

    getAllBlocks: () => {
        return DatabaseDataAccess.findAll(Config.database.collections.blocks).then((blocks: Block[]) => {
            return blocks;
        });
    },

    getOneBlock: (hash: string) => {
        return DatabaseDataAccess.findOne(Config.database.collections.blocks, {hash: hash}).then((block: Block) => {
            return block;
        });
    },

    createOneBlock: (data: any) => {
        return new Promise((resolve, reject) => {
            //this.getLastBlock().then(lastBlock => {
            Block.createNonce().then((nonce: number) => {
                data.prevBlock = null;
                data.nonce = nonce;
            });

            const block = new Block(data);
            console.log(block);

            DatabaseDataAccess.insertOne(Config.database.collections.blocks, block).then(result => {
                resolve(result);
            }, (e: Error) => {
                reject(e);
            });
            //}, err => reject(err));
        });
    },

    getLastBlock: () => {
        return DatabaseDataAccess.findLastOne(Config.database.collections.blocks)
            .then((block: Block) => {
                console.log(block)
            }, (e: Error) => console.log(e));
    },

    validateBlock: (block: Block) => {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

};
import {Config} from "../config";
import {Block, DbClient, Debug} from "../models";


export const BlockServices = {

    getAllBlocks: (): Promise<Block[]> => {
        return DbClient.find(Config.database.collections.blocks)
            .then((res: any[]) => {
                return res.map(i => new Block(i));
            });
    },

    getOneBlock: (hash: string): Promise<Block> => {
        return DbClient.findOne(Config.database.collections.blocks, {currHash: hash})
            .then((res: any) => {
                console.log(res)
                return new Block(res);
            })
    },

    getLastBlock: (): Promise<Block> => {
        return DbClient.findLastOne(Config.database.collections.blocks)
            .then((res: any) => {
                return new Block(res);
            });
    },

    createOneBlock: (data: any): Promise<Block> => {
        return new Promise((resolve, reject) => {
            DbClient.findLastOne(Config.database.collections.blocks)
                .then((res: any) => {
                    if (res) console.log('no previous block, genesis block creation');

                    const lastBlock = new Block(res);
                    return Block.createNonce().then((nonce: number) => {
                        data.prevBlock = lastBlock;
                        data.nonce = nonce;

                        const block = new Block(data);
                        return DbClient.insertOne(Config.database.collections.blocks, block)
                            .then(() => {
                                resolve(block);
                            })
                    });

                });
        });
    }

};
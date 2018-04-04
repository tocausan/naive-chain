import {Config} from "../config";
import {Block, DbClient} from "../models";

export const ChainServices = {

    checkChain: (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            return DbClient.find(Config.database.collections.blocks)
                .then((res: any[]) => {
                    let errors: any[] = [];
                    const blocks = res.map(i => new Block(i));

                    blocks.reverse().forEach((block, index) => {
                        if (index + 1 < blocks.length) {
                            let isValid = Block.isValid(block, blocks[index + 1]);
                            if (!isValid) {
                                errors.push(block);
                            }
                        }
                    });

                    if (errors.length === 0) {
                        resolve(true);
                    } else {
                        reject(new Error('Corrupted block found: ' + errors.join(',')));
                    }
                });
        });
    },

};
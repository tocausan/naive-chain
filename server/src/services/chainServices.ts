import {Config} from "../config";
import {DatabaseDataAccess} from '../data-access';
import {Block} from "../models";

export const ChainServices = {

    checkChain: () => {
        return new Promise((resolve, reject) => {
            DatabaseDataAccess.findAll(Config.database.collections.blocks).then((blocks: Block[]) => {
                let errors: any[] = [];
                blocks.reverse().forEach((block, index) => {
                    if (index + 1 < blocks.length) {
                        let isValid = Block.isValid(block, blocks[index + 1]);
                        if (!isValid) {
                            errors.push(block);
                        }
                    }
                });
                if (errors.length === 0) {
                    resolve({success: 'The chain isn\'t corrupted'});
                } else {
                    reject({error: 'Corrupted block found: ' + errors.join(',')});
                }
            });
        });
    },

    getDevices: () => {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }

};
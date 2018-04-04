import {Request, Response} from "express";
import {ErrorRoutes} from './errorRoutes';
import {BlockServices} from '../services';
import {Block, Debug} from "../models";

export const BlockRoutes = {

    getAllBlocks: (req: Request, res: Response) => {
        BlockServices.getAllBlocks()
            .then((blocks: Block[]) => {
                res.json(blocks);
            })
            .catch((e: Error) => {
                Debug.error(e);
                ErrorRoutes.handler(e, req, res);
            });
    },

    getOneBlock: (req: Request, res: Response) => {
        BlockServices.getOneBlock(req.body.hash)
            .then((block: Block) => {
                res.json(block);
            })
            .catch((e: Error) => {
                Debug.error(e);
                ErrorRoutes.handler(e, req, res);
            });
    },

    createOneBlock: (req: Request, res: Response) => {
        console.log(req.body.block);
        BlockServices.createOneBlock(req.body.block)
            .then((block: Block) => {
                res.json(block);
            })
            .catch((e: Error) => {
                Debug.error(e);
                ErrorRoutes.handler(e, req, res);
            });
    }
};
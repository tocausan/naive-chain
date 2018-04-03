import {Request, Response} from "express";
import {ErrorRoutes} from './errorRoutes';
import {BlockServices} from '../services';
import {Block} from "../models";

export const BlockRoutes = {

    getAllBlocks: (req: Request, res: Response) => {
        BlockServices.getAllBlocks()
            .then((blocks: Block[]) => {
                res.json(blocks);
            });
    },

    getOneBlock: (req: Request, res: Response) => {
        BlockServices.getOneBlock(req.params.hash).then((block: Block) => {
            res.json(block);
        }, (e: Error) => ErrorRoutes.handler(e, req, res));
    },

    createOneBlock: (req: Request, res: Response) => {
        console.log(req.body.block);
        BlockServices.createOneBlock(req.body.block).then((block: Block) => {
            console.log(block);
            res.json(block);
        }, (e: Error) => ErrorRoutes.handler(e, req, res));
    },

    validateOneBlock: (req: Request, res: Response) => {
        BlockServices.validateBlock(req.body).then((block: Block) => {
            res.json(block);
        }, (e: Error) => ErrorRoutes.handler(e, req, res));
    }
};
import {Request, Response} from "express";
import {ErrorRoutes} from './errorRoutes';
import {ChainServices} from '../services';

export const ChainRoutes = {

        checkChain: (req: Request, res: Response) => {
            ChainServices.checkChain().then((check: boolean) => {
                res.json(check);
            }, (e: Error) => ErrorRoutes.handler(e, req, res));
        }

    }
;
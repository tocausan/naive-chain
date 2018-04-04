import {Request, Response} from "express";
import {ErrorRoutes} from './errorRoutes';
import {ChainServices} from '../services';
import {Debug} from "../models";

export const ChainRoutes = {

        checkChain: (req: Request, res: Response) => {
            ChainServices.checkChain()
                .then((check: boolean) => {
                    res.json(check);
                })
                .catch((e: Error) => {
                    Debug.error(e);
                    ErrorRoutes.handler(e, req, res);
                });
            ;
        }

    }
;
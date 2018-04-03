import * as _ from 'lodash';
import {Request, Response} from "express";
import {Debug} from '../models';
import {ErrorApi} from "../models/Error";

export const ErrorRoutes = {

    _404: (req: Request, res: Response) => {
        const e = new ErrorApi('Not Found');
        e.status = 404;
        return res.json(e);
    },

    handler: (err: any, req: Request, res: Response) => {
        const e = new ErrorApi()
        e.status = !_.isNil(err.status) ? err.status : 500;
        e.message = !_.isNil(err.message) ? err.message : err;
        e.stack = !_.isNil(err.stack) && req.app.get('env') === 'development' ? err.stack : {};
        Debug.error(err);
        return res.json(e);
    }

};
import {Request, Response} from "express";
import {ErrorRoutes} from './errorRoutes';
import {DeviceServices} from '../services';

export const DeviceRoutes = {

    isConnected: (req: Request, res: Response) => {
        return DeviceServices.isConnected().then((result: boolean) => {
            return res.json(result);
        }, (e: Error) => ErrorRoutes.handler(e, req, res));
    },

    init: (req: Request, res: Response) => {
        return DeviceServices.init(req)
            .then((result: any) => {
                return res.json(result);
            }, (e: Error) => ErrorRoutes.handler(e, req, res));
    }

};
import {Router, Request, Response} from "express";
import {ErrorRoutes} from "./errorRoutes";
import {BlockRoutes} from "./blockRoutes";
import {ChainRoutes} from "./chainRoutes";
import {Middleware} from "./middlewares/corsMiddleware";
import * as path from 'path';

export const Routes = Router()

    .use('/', [Middleware.cors])

    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    })

    .get('/api', (req: Request, res: Response) => {
        return res.json({
            app: 'naive-chain API',
            routes: [
                '/api/device/connected',
                '/api/device/init',
                '/api/block/all',
                '/api/block/one/:hash',
                '/api/block/create',
                '/api/block/validate',
                '/api/chain/check'
            ]
        });
    })

    .post('/api/block/all', BlockRoutes.getAllBlocks)
    .post('/api/block/one', BlockRoutes.getOneBlock)
    .post('/api/block/create', BlockRoutes.createOneBlock)

    .post('/api/chain/check', ChainRoutes.checkChain)

    .use(ErrorRoutes._404)
    .use(ErrorRoutes.handler);
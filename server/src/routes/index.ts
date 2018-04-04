import {Router, Request, Response} from "express";
import {ErrorRoutes} from "./errorRoutes";
import {BlockRoutes} from "./blockRoutes";
import {ChainRoutes} from "./chainRoutes";
import {CorsMiddleware} from "./middlewares";
import * as path from 'path';
import {Config} from "../config";

export const Routes = Router()

    .use('/', [CorsMiddleware.enableCors])

    .get('/', (req, res) => {
        console.log(req.connection.remoteAddress)
        console.log(req.connection.localAddress)
        res.sendFile(path.join(__dirname, '../views/index.html'));
    })

    .post('/api', (req: Request, res: Response) => {
        return res.json({
            app: Config.app,
            routes: [
                {path: '/api', description: 'get API infos'},
                {path: '/api/block/all', description: 'get all blocks'},
                {path: '/api/block/one', description: 'get one block'},
                {path: '/api/block/create', description: 'create one block'},
                {path: '/api/chain/check', description: 'check chain integrity'}
            ]
        });
    })

    .post('/api/block/all', BlockRoutes.getAllBlocks)
    .post('/api/block/one', BlockRoutes.getOneBlock)
    .post('/api/block/create', BlockRoutes.createOneBlock)

    .post('/api/chain/check', ChainRoutes.checkChain)

    .use(ErrorRoutes._404)
    .use(ErrorRoutes.handler);
import {Router, Request, Response} from "express";
import {ErrorRoutes} from "./errorRoutes";
import {DeviceRoutes} from "./deviceRoutes";
import {BlockRoutes} from "./blockRoutes";
import {ChainRoutes} from "./chainRoutes";
import {Middleware} from "./middlewares/corsMiddleware";

export const Routes = Router()

    .use('/', [Middleware.cors])

    .get('/', (req, res) => {
        res.sendFile('views/index/index.html');
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

    .post('/api/device/connected', DeviceRoutes.isConnected)
    .post('/api/device/init', DeviceRoutes.init)

    .post('/api/block/all', BlockRoutes.getAllBlocks)
    .post('/api/block/one/:hash', BlockRoutes.getOneBlock)
    .post('/api/block/create', BlockRoutes.createOneBlock)
    .post('/api/block/validate', BlockRoutes.validateOneBlock)

    .post('/api/chain/check', ChainRoutes.checkChain)

    .use(ErrorRoutes._404)
    .use(ErrorRoutes.handler);
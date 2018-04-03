"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorRoutes_1 = require("./errorRoutes");
const deviceRoutes_1 = require("./deviceRoutes");
const blockRoutes_1 = require("./blockRoutes");
const chainRoutes_1 = require("./chainRoutes");
const corsMiddleware_1 = require("./middlewares/corsMiddleware");
exports.Routes = express_1.Router()
    .use('/', [corsMiddleware_1.Middleware.cors])
    .get('/', (req, res) => {
    res.sendFile('views/index/index.html');
})
    .get('/api', (req, res) => {
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
    .post('/api/device/connected', deviceRoutes_1.DeviceRoutes.isConnected)
    .post('/api/device/init', deviceRoutes_1.DeviceRoutes.init)
    .post('/api/block/all', blockRoutes_1.BlockRoutes.getAllBlocks)
    .post('/api/block/one/:hash', blockRoutes_1.BlockRoutes.getOneBlock)
    .post('/api/block/create', blockRoutes_1.BlockRoutes.createOneBlock)
    .post('/api/block/validate', blockRoutes_1.BlockRoutes.validateOneBlock)
    .post('/api/chain/check', chainRoutes_1.ChainRoutes.checkChain)
    .use(errorRoutes_1.ErrorRoutes._404)
    .use(errorRoutes_1.ErrorRoutes.handler);
//# sourceMappingURL=index.js.map
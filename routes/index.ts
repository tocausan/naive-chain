let express = require('express'),
    errorRoutes = require('./errorRoutes'),
    deviceRoutes = require('./deviceRoutes'),
    chainRoutes = require('./chainRoutes'),
    blockRoutes = require('./blockRoutes'),
    corsMiddleware = require('./middlewares/corsMiddleware');

module.exports = express.Router()

    .use('/', [corsMiddleware])

    .get('/', (req, res) => {
        res.sendfile('views/index/index.html');
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

    .post('/api/device/connected', deviceRoutes.isConnected)
    .post('/api/device/init', deviceRoutes.init)

    .post('/api/block/all', blockRoutes.getAllBlocks)
    .post('/api/block/one/:hash', blockRoutes.getOneBlock)
    .post('/api/block/create', blockRoutes.createOneBlock)
    .post('/api/block/validate', blockRoutes.validateOneBlock)

    .post('/api/chain/check', chainRoutes.checkChain)

    .use(errorRoutes._404)
    .use(errorRoutes.handler);
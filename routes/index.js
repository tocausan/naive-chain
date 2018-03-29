let express = require('express'),
    errorRoutes = require('./errorRoutes'),
    deviceRoutes = require('./deviceRoutes'),
    chainRoutes = require('./chainRoutes'),
    blockRoutes = require('./blockRoutes');

module.exports = express.Router()

    .get('/', (req, res) => {
        res.sendfile('views/index/index.html');
    })

    .post('/api/device/init', deviceRoutes.init)

    .post('/api/block/all', blockRoutes.getAllBlocks)
    .post('/api/block/one/:hash', blockRoutes.getOneBlock)
    .post('/api/block/create', blockRoutes.createOneBlock)
    .post('/api/block/validate', blockRoutes.validateOneBlock)

    .post('/api/chain/check', chainRoutes.checkChain)

    .use(errorRoutes._404)
    .use(errorRoutes.handler);
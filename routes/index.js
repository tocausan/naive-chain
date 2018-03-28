let express = require('express'),
    errors = require('./errors'),
    device = require('./device'),
    chain = require('./chain');

module.exports = express.Router()

    .get('/', (req, res) => {
        res.sendfile('views/index/index.html');
    })

    .post('/api/init', device.init)
    .post('/api/block/all', chain.getBlocks)
    .post('/api/block/one/:hash', chain.getBlock)
    .post('/api/block/create', chain.insertBlock)
    .post('/api/block/validate', chain.validateBlock)
    .post('/api/chain/check', chain.checkChain)
    .post('/api/chain/devices', chain.getDevices)

    .use(errors._404)
    .use(errors.handler);
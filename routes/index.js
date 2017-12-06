let express = require('express'),
    blockchainRoutes = require('./blockchain');


module.exports = express.Router()

    .get('/', blockchainRoutes.init)
    .get('/blocks', blockchainRoutes.getAllBlocks)
    .get('/block/:hash', blockchainRoutes.getBlockByHash)

    .post('/blocks', blockchainRoutes.addBlock)


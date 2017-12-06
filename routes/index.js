let express = require('express'),
    blockchainRoutes = require('./blockchain');


module.exports = express.Router()

    .get('/', blockchainRoutes.init)
    .get('/chains', blockchainRoutes.getAllChains)
    .get('/chain/:name', blockchainRoutes.getChainByName)


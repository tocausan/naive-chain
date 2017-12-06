let express = require('express'),
    chainsRoutes = require('./chains');


module.exports = express.Router()

    .get('/', chainsRoutes.init)
    .get('/chains', chainsRoutes.getChains)
    .get('/chain/:name', chainsRoutes.getChain)
    .get('/chain/:name/blocks', chainsRoutes.getChainBlocks)
    .get('/chain/:name/block/:hash', chainsRoutes.getChainBlock)

    .post('/chains', chainsRoutes.addBlock)


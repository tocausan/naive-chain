let express = require('express'),
    errorsRoutes = require('./errors'),
    chainsRoutes = require('./chains');


module.exports = express.Router()

    .get('/', chainsRoutes.init)
    .get('/chains', chainsRoutes.getChains)
    .get('/chain/:name', chainsRoutes.getChain)
    .get('/chain/:name/blocks', chainsRoutes.getChainBlocks)
    .get('/chain/:name/block/:hash', chainsRoutes.getChainBlock)

    .post('/chains', chainsRoutes.addChain)
    .post('/chain/:name/blocks', chainsRoutes.addBlock)

    .use(errorsRoutes.error404)
    .use(errorsRoutes.errorHandler);


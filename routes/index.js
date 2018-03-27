let express = require('express'),
    errors = require('./errors'),
    device = require('./device');
chain = require('./chain');

module.exports = express.Router()

    .get('/', (req, res) => {
        console.log(req.connection.remoteAddress)
        console.log(req.connection.remotePort)
        console.log(req.connection.localAddress)
        console.log(req.connection.localPort)
        res.json({a:1});
    })
    .get('/init', device.init)

    .get('/blocks', chain.getBlocks)
    .post('/blocks', chain.insertBlock)
    .get('/block/:hash', chain.getBlock)
    .post('/validate', chain.validateBlock)

    .get('/chain/check', chain.checkChain)
    .get('/chain/devices', chain.getDevices)

    .use(errors._404)
    .use(errors.handler);

/**
 - device
 - - init
 - - - connect
 - - - - database
 - - - - network
 - chain
 - - check
 - - block
 - - - insert one
 - - - get one
 - - - get all
 - - - validate one
 - - devices
 - - - get all
 **/
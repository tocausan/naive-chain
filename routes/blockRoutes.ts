import {ErrorRoutes} from './errorRoutes';
import {BlockServices, DevicesServices} from '../services';
import {Block} from '../models';

let _ = require('lodash'),
    errorRoutes = require('./errorRoutes'),
    blockServices = require('../services').blockServices,
    deviceServices = require('../services').deviceServices,
    Block = require('../models/Block');

export const BlockRoutes = {

    getAllBlocks: (req, res) => {
        blockServices.getAllBlocks()
            .then(result => {
                res.json(result);
            });
    },

    getOneBlock: (req, res) => {
        blockServices.getOneBlock(req.params.hash).then(result => {
            res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    },

    createOneBlock: (req, res) => {
        console.log(req.body.block);
        blockServices.createOneBlock(req.body.block).then(result => {
            console.log(result);
            res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    },

    validateOneBlock: (req, res) => {
        blockServices.validateBlock(req.body).then(result => {
            res.json(result);
        }, err => errorRoutes.handler(err, req, res));
    }
};
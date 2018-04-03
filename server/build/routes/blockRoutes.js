"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorRoutes_1 = require("./errorRoutes");
const services_1 = require("../services");
exports.BlockRoutes = {
    getAllBlocks: (req, res) => {
        services_1.BlockServices.getAllBlocks()
            .then((blocks) => {
            res.json(blocks);
        });
    },
    getOneBlock: (req, res) => {
        services_1.BlockServices.getOneBlock(req.params.hash).then((block) => {
            res.json(block);
        }, (e) => errorRoutes_1.ErrorRoutes.handler(e, req, res));
    },
    createOneBlock: (req, res) => {
        console.log(req.body.block);
        services_1.BlockServices.createOneBlock(req.body.block).then((block) => {
            console.log(block);
            res.json(block);
        }, (e) => errorRoutes_1.ErrorRoutes.handler(e, req, res));
    },
    validateOneBlock: (req, res) => {
        services_1.BlockServices.validateBlock(req.body).then((block) => {
            res.json(block);
        }, (e) => errorRoutes_1.ErrorRoutes.handler(e, req, res));
    }
};
//# sourceMappingURL=blockRoutes.js.map
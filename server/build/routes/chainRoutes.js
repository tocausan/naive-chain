"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorRoutes_1 = require("./errorRoutes");
const services_1 = require("../services");
exports.ChainRoutes = {
    checkChain: (req, res) => {
        services_1.ChainServices.checkChain().then((check) => {
            res.json(check);
        }, (e) => errorRoutes_1.ErrorRoutes.handler(e, req, res));
    }
};
//# sourceMappingURL=chainRoutes.js.map
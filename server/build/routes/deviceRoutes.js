"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorRoutes_1 = require("./errorRoutes");
const services_1 = require("../services");
exports.DeviceRoutes = {
    isConnected: (req, res) => {
        return services_1.DeviceServices.isConnected().then((result) => {
            return res.json(result);
        }, (e) => errorRoutes_1.ErrorRoutes.handler(e, req, res));
    },
    init: (req, res) => {
        return services_1.DeviceServices.init(req)
            .then((result) => {
            return res.json(result);
        }, (e) => errorRoutes_1.ErrorRoutes.handler(e, req, res));
    }
};
//# sourceMappingURL=deviceRoutes.js.map
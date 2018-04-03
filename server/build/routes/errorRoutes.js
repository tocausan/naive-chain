"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const models_1 = require("../models");
const Error_1 = require("../models/Error");
exports.ErrorRoutes = {
    _404: (req, res) => {
        const e = new Error_1.ErrorApi('Not Found');
        e.status = 404;
        return res.json(e);
    },
    handler: (err, req, res) => {
        const e = new Error_1.ErrorApi();
        e.status = !_.isNil(err.status) ? err.status : 500;
        e.message = !_.isNil(err.message) ? err.message : err;
        e.stack = !_.isNil(err.stack) && req.app.get('env') === 'development' ? err.stack : {};
        models_1.Debug.error(err);
        return res.json(e);
    }
};
//# sourceMappingURL=errorRoutes.js.map
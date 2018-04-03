let _ = require('lodash'),
    Debug = require('../models').Debug;

module.exports = {

    _404: (req, res, next) => {
        const e = new Error('Not Found');
        e.status = 404;
        return res.json(e);
    },

    handler: (err, req, res, next) => {
        const e = {
            status: !_.isNil(err.status) ? err.status : 500,
            message: !_.isNil(err.message) ? err.message : err,
            stack: !_.isNil(err.stack) && req.app.get('env') === 'development' ? err.stack : {}
        };
        return res.json(e);
    }

};
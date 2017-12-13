let _ = require('lodash');

module.exports = {

    _404: function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },

    handler: function (err, req, res, next) {
        return res.json({
            status: !_.isNil(err.status) ? err.status : 500,
            message: !_.isNil(err.message) ? err.message : err,
            stack: !_.isNil(err.stack) && req.app.get('env') === 'development' ? err.stack : {}
        });
    }

};
module.exports = {

    error404: function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },

    errorHandler: function (err, req, res, next) {
        return res.json({
            status: err.status || 500,
            message: err.message ? err.message : err,
            stack: err.stack && req.app.get('env') === 'development' ? err.stack : {}
        });
    }

};
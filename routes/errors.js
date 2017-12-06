module.exports = {
    error404: function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },
    
    errorHandler: function (err, req, res, next) {
        res.json({
            status: err.status || 500,
            message: err.message,
            error: req.app.get('env') === 'development' ? err.stack : {}
        });
    }
};
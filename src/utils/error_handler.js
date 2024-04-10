function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    const path = err.path || req.path;

    res.status(status).json({ status, message, path });
}

module.exports = errorHandler;
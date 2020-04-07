const errorHandler = function (err, req, res, next) {
    res.status(500).json({error: 'Internal Server Error'})
}

module.exports = errorHandler;

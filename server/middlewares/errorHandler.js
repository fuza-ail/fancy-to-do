const errorHandler = function (err, req, res, next) {
  console.log(err)
  res.status(400).json(err)
}

module.exports = errorHandler;

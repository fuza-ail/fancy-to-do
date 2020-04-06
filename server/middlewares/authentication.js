const{ User } = require('../models')
const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {
  try {
    const token = req.headers.access_token;
    if (token) {
      const decoded = jwt.verify(token,'rahasia')
      // req.UserId = decoded.UserId
      // req.email = decoded.UserEmail
      req.user = decoded
      User.findOne({ where: { email: decoded.UserEmail}})
      .then((user) => {
        if(!user) {
          throw {
            status: 404,
            message: "User not found"
          }
        }
      })
      next()
    } else {
      res.status(404).json({error: 'token not found'})
    }
  }
  catch(err){
    // res.status(400).json(err)
    next(err)
  }
}

module.exports = authentication;
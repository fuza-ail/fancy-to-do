const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {
  try {
    const token = req.headers.access_token;
    if (token) {
      const decoded = jwt.verify(token,'rahasia')
      console.log(decoded)
      req.userId = decoded.userId
      next()
    } else {
      res.status(404).json({error: 'token not found'})
      // throw new Error({ error: 'token not found' })
    }
  }
  catch(err){
    res.status(400).json(err)
  }
}

module.exports = authentication;
const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {
  try {
    const token = req.headers.access_token;
    // const token = localStorage.getItem('access_token')
    console.log(token)
    if (token) {
      const decoded = jwt.verify(token,'rahasia')
      console.log(decoded)
      req.UserId = decoded.UserId
      req.email = decoded.UserEmail
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
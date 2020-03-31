const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {
  try {
    const token = req.headers.token;
    if (token) {
      const decoded = jwt.verify(token,'rahasia')

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
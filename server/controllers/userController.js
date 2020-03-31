const { User } = require('../models');
const { hashPassword, checkAccount } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken')

class userController {
  static register(req, res) {
    let userData = req.body;
    userData.password = hashPassword(req.body.password)
    User.create(userData)
      .then(user => {
        const token = jwt.sign({
          userId: user.id,
          userEmail: user.email
        }, "rahasia")
        res.status(201).json({ access_token: token })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static login(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) {
          if (checkAccount(req.body.password, user.password)) {
            const token = jwt.sign({
              userId: user.id,
              userEmail: user.email
            },"rahasia")
            res.status(201).json({ access_token: token })
          } else {
            res.status(400).json({ error: 'wrong password' })
          }
        } else {
          res.status(400).json({ error: 'email not found' })
        }
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = userController

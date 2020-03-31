const { User } = require('../models');
const { hashPassword, checkAccount } = require('../helpers/authentication');
const jwt = require('jsonwebtoken')

class userController {
  static register(req, res) {
    let userData = req.body;
    userData.password = hashPassword(req.body.password)
    User.create(userData)
      .then(user => {
        res.status(201).json(user)
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
            let userData = { id: user.id, email: user.email }
            jwt.sign(userData,'secret',(err,token)=>{
              res.status(200).json({token:token})
            })
          }else{
            res.status(401).json({error:'wrong password'})
          }
        }else{
          res.status(404).json({error:'email not found'})
        }
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = userController

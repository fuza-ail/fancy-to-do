require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../helpers/bcrypt');
const client = new OAuth2Client('527992805647-u8gb95q95eau1g1o33doef2lmab16jce.apps.googleusercontent.com');

class GoogleController {
  static loginGoogle(req, res) {
    let token = req.body.token;
    let userData = {};
    console.log('token')
    client.verifyIdToken({
      idToken: token,
      audience: '527992805647-u8gb95q95eau1g1o33doef2lmab16jce.apps.googleusercontent.com'
    })
      .then(data => {
        const payload = data.getPayload();
        userData.email = payload.email;
        userData.password = hashPassword('default');
        return User.findOne({
          where: {
            email: payload.email
          }
        })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create(userData)
        }
      })
      .then(theUser => {
        const token = jwt.sign({
          email: theUser.email,
          id: theUser.id
        }, 'rahasia')
        res.status(200).json({
          access_token: token
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = GoogleController
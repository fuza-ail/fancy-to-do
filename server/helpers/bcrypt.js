const bcrypt = require('bcryptjs');

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(8);
  let hash = bcrypt.hashSync(password, salt);
  return hash
}

function checkAccount(pass, hash) {
  return bcrypt.compareSync(pass, hash)
}

module.exports = { hashPassword, checkAccount }
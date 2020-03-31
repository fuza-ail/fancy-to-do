const { Todo } = require('../models')
const authorization = function (req, res, next) {
  Todo.findOne({ where: { id: req.params.id } })
    .then(todo => {
      if (todo) {
        if (todo.UserId == req.UserId) {
          next()
        } else {
          res.status(400).json({ error: 'access forbidden' })
        }
      } else {
        res.status(404).json({ error: 'todo not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ err: 'server error' })
    })
}

module.exports = authorization;
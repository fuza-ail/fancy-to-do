const { Todo, User } = require('../models');
const sendEmail = require('../helpers/sendGrid')

class TodoController {
  static displayTodos(req, res,next) {
    Todo.findAll({ where: { UserId: req.user.UserId } })
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(next)

  }

  static createTodo(req, res, next) {
    Todo.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.user.UserId
    })
      .then((todo) => {
        res.status(201).json(todo);
        return Todo.findOne({
          where: { id: todo.id }
        })
      })
      .then(data => {
        sendEmail(req.email,data.title,data.description)
      })
      .catch(next)
  }

  static displayTodo(req, res,next) {
    Todo.findOne({ where: { id: req.params.id } })
      .then(todo => {
        if (todo == null) {
          res.status(404).json({ error: 'not found' });
        } else {
          res.status(200).json(todo);
        }
      })
      .catch(next)
  }

  static editTodo(req, res,next) {
    Todo.findByPk(req.params.id)
      .then(todo => {
        return Todo.update({ title: req.body.title, description: req.body.description, status: req.body.status, due_date: req.body.due_date }, { where: { id: req.params.id } })
          .then(data => {
            res.status(200).json(todo)
          })
      })
      .catch(next)
  }

  static deleteTodo(req, res,next) {
    Todo.findByPk(req.params.id)
      .then(todo => {
        return Todo.destroy({ where: { id: req.params.id } })
          .then(data => {
            res.status(200).json(todo)
          })
          .catch(err => {
            res.status(500).json(err)
          })
      })
      .catch(next)
  }
}

module.exports = TodoController;
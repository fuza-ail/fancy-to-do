const { Todo, User } = require('../models');
const addToCalendar = require('../helpers/googleCalendarAPi')

class TodoController {
  static displayTodos(req, res) {
    Todo.findAll({ where: { UserId: req.UserId } })
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        res.status(500).json(err);
      })

  }

  static createTodo(req, res, next) {
    Todo.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.UserId
    })
      .then((todo) => {
        res.status(201).json(todo);
        return Todo.findOne({
          where: { id: todo.id }
        })
      })
      .then(data => {
        // addToCalendar(data.createdAt, data.due_date, data.title, data.description, req.email)
      })
      .catch(next)
  }

  static displayTodo(req, res) {
    Todo.findOne({ where: { id: req.params.id } })
      .then(todo => {
        if (todo == null) {
          res.status(404).json({ error: 'not found' });
        } else {
          res.status(200).json(todo);
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

  static editTodo(req, res) {
    Todo.findByPk(req.params.id)
      .then(todo => {
        return Todo.update({ title: req.body.title, description: req.body.description, status: req.body.status, due_date: req.body.due_date }, { where: { id: req.params.id } })
          .then(data => {
            res.status(200).json(todo)
          })
      })
      .catch(err => {
        res.status(404).json({ error: 'not found' })
      })
  }

  static deleteTodo(req, res) {
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
      .catch(err => {
        res.status(404).json({ error: 'not found' })
      })
  }
}

module.exports = TodoController;
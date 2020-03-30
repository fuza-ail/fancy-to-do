const { Todo } = require('../models');

class Controller {
  static displayTodos(req, res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createTodo(req, res) {
    console.log(req.headers)
    Todo.create({ title: req.body.title, description: req.body.description, status: req.body.status, due_date: req.body.due_date })
      .then((todo) => {
        res.status(201).json(todo)
      })
      .catch(err => {
        res.status(400).json(err.errors[0])
      })
  }

  static displayTodo(req, res) {
    Todo.findOne({ where: { id: req.params.id } })
      .then(todo => {
        if (todo == null) {
          res.status(404).json('error not found')
        } else {
          res.status(200).json(todo)
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static editTodo(req, res) {
    Todo.update({ title: req.body.title, description: req.body.description, status: req.body.status, due_date: req.body.due_date }, { where: { id: req.params.id } })
      .then(updated => {
        if (updated[0] == 0) {
          res.status(404).json('error not found')
        } else {
          res.status(200).json(updated)
        }
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static deleteTodo(req, res) {
    Todo.destroy({ where: { id: req.params.id } })
      .then(deleted => {
        if (deleted == 0) {
          res.status(404).json('error not found')
        } else {
          res.status(200).json(deleted)
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = Controller;
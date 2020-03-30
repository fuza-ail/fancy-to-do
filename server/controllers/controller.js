const { Todo } = require('../models');

class Controller {
  static displayTodos(req, res) {
    console.log(req.header)
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createTodo(req, res) {
    console.log(req.body)
    Todo.create({ title: req.body.title, description: req.body.description, status: req.body.status, due_date: req.body.due_date })
      .then((todo) => {
        res.status(201).json(todo)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  }

  static displayTodo(req, res) {
    Todo.findAll({ where: { id: req.params.id } })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static editTodo(req, res) {
    Todo.update({ title: req.body.title, description: req.body.description, status: req.body.status, due_date: req.body.due_date }, { where: { id: req.params.id } })
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static deleteTodo(req, res) {
    Todo.destroy({ where: { id: req.params.id } })
      .then(deleted => {
        res.status(200).json(deleted)
      })
      .catch(err => [
        res.status(404).json(err)
      ])
  }
}

module.exports = Controller;
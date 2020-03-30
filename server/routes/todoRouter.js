const todoRouter = require('express').Router();
const Controller = require('../controllers/controller');


todoRouter.get('/todos', Controller.displayTodos);
todoRouter.post('/todos', Controller.createTodo);
todoRouter.get('/todos/:id', Controller.displayTodo);
todoRouter.put('/todos/:id', Controller.editTodo);
todoRouter.delete('/todos/:id', Controller.deleteTodo);

module.exports = todoRouter;
const todoRouter = require('express').Router();
const TodoController = require('../controllers/todoController');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

todoRouter.get('/todos', authentication, TodoController.displayTodos);
todoRouter.post('/todos', authentication, TodoController.createTodo);
todoRouter.get('/todos/:id', [authentication, authorization], TodoController.displayTodo);
todoRouter.put('/todos/:id', [authentication, authorization], TodoController.editTodo);
todoRouter.delete('/todos/:id', [authentication, authorization], TodoController.deleteTodo);

module.exports = todoRouter;
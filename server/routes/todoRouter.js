const todoRouter = require('express').Router();
const TodoController = require('../controllers/todoController');


todoRouter.get('/todos', TodoController.displayTodos);
todoRouter.post('/todos', TodoController.createTodo);
todoRouter.get('/todos/:id', TodoController.displayTodo);
todoRouter.put('/todos/:id', TodoController.editTodo);
todoRouter.delete('/todos/:id', TodoController.deleteTodo);

module.exports = todoRouter;
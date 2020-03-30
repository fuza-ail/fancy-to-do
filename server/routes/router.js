const router = require('express').Router();
const Controller = require('../controllers/controller');


router.get('/todos', Controller.displayTodos);
router.post('/todos', Controller.createTodo);
router.get('/todos/:id', Controller.displayTodo);
router.get('/todos/:id/edit', Controller.editTodo);
router.get('/todos/:id/delete', Controller.deleteTodo);

module.exports = router;
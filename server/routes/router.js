const router = require('express').Router();
const Controller = require('../controllers/controller');


router.get('/todos', Controller.displayTodos);
router.post('/todos', Controller.createTodo);
router.get('/todos/:id', Controller.displayTodo);
router.put('/todos/:id', Controller.editTodo);
router.delete('/todos/:id', Controller.deleteTodo);

module.exports = router;
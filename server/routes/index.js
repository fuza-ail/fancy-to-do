const router = require('express').Router();
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');
const errorHandler = require('../middlewares/errorHandler')

router.use(userRouter)
router.use(todoRouter)

router.use(errorHandler)

module.exports = router;
const userRouter = require('express').Router();
const userController = require('../controllers/userController')
const GoogleController = require('../controllers/googleController')

userRouter.post('/register', userController.register);
userRouter.post('/login',userController.login);

userRouter.post('/loginGoogle', GoogleController.loginGoogle)


module.exports= userRouter
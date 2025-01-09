const Router = require('express').Router;
const userController = require('../controllers/user.controller');

const userRouter = new Router();

userRouter.post('/', userController.register);

module.exports = userRouter;

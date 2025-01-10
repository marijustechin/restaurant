const Router = require("express").Router;
const userController = require("../controllers/user.controller");

const userRouter = new Router();

userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/:id", userController.deleteUser);
userRouter.get("/", userController.getAll);

module.exports = userRouter;

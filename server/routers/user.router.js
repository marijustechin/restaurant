const Router = require("express").Router;
const userController = require("../controllers/user.controller");

const userRouter = new Router();

// naudotoju sarasas
userRouter.get("/", userController.getAll);
// naudotojas paga id
userRouter.get("/:id", userController.getUserById);

// sukuriam nauja
userRouter.post("/", userController.register);

// prisijungimas
userRouter.post("/login", userController.login);

// atsijungimas
userRouter.post("/logout", userController.logout);

// naudotojo modifikavimas
userRouter.put("/:id", userController.updateUser);

// istrinam
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;

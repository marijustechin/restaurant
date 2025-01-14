const Router = require("express").Router;
const menuController = require("../controllers/menu.controller");

const menuRouter = new Router();

// - **Read All Menu Items**: `GET /menu`
menuRouter.get("/", menuController.allItems);
// - **Create Menu Item**: `POST /menu`
menuRouter.post("/", menuController.newItem);
// - **Read Menu Item by ID**: `GET /menu/:id`
menuRouter.get("/:id", menuController.itemById);
// - **Update Menu Item by ID**: `PUT /menu/:id`
menuRouter.put("/:id", menuController.updateItem);
// - **Delete Menu Item by ID**: `DELETE /menu/:id`
menuRouter.delete("/:id", menuController.removeItem);

module.exports = menuRouter;

const Router = require("express").Router;
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validator = require("../validators/category.validator");

const categoryRouter = new Router();

// - **Read All category Items**: `GET /category`
// neapsaugotas
categoryRouter.get("/", categoryController.getAllCategories);

// - **Create category Item**: `POST /category`
// tik admin
categoryRouter.post(
  "/",
  authMiddleware.isAdmin,
  validator.newCategory,
  categoryController.newCategory
);

// - **Read category Item by ID**: `GET /category/:id`
// neapsaugotas
categoryRouter.get("/:id", categoryController.getCategoryById);

// - **Update category Item by ID**: `PUT /category/:id`
// tik adminas
categoryRouter.put(
  "/:id",
  authMiddleware.isAdmin,
  validator.newCategory,
  categoryController.editCategory
);

// - **Delete category Item by ID**: `DELETE /category/:id`
// tik adminas
categoryRouter.delete(
  "/:id",
  authMiddleware.isAdmin,
  categoryController.deleteCategory
);

module.exports = categoryRouter;

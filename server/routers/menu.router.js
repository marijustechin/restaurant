const Router = require('express').Router;
const menuController = require('../controllers/menu.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const menuRouter = new Router();

// - **Read All Menu Items**: `GET /menu`
menuRouter.get('/', menuController.allItems);

// - **Create Menu Item**: `POST /menu`
// tik adminas
menuRouter.post('/', authMiddleware.isAdmin, menuController.newItem);

// - **Read Menu Item by ID**: `GET /menu/:id`
menuRouter.get('/:id', menuController.itemById);

// - **Update Menu Item by ID**: `PUT /menu/:id`
// tik adminas
menuRouter.put('/:id', authMiddleware.isAdmin, menuController.updateItem);

// - **Delete Menu Item by ID**: `DELETE /menu/:id`
// tik adminas
menuRouter.delete('/:id', authMiddleware.isAdmin, menuController.removeItem);

module.exports = menuRouter;

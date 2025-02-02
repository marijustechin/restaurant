const { validationResult } = require('express-validator');
const menuService = require('../services/menu.service');

class MenuController {
  async newItem(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        throw ApiError.BadRequest(
          'Validacijos klaida',
          validationErrors.array()
        );

      const { name, description, price, category_id, image } = req.body;

      const newMenuItem = await menuService.createMenuItem(
        name,
        description,
        price,
        category_id,
        image
      );

      res.status(200).json(newMenuItem);
    } catch (e) {
      next(e);
    }
  }

  async allItems(req, res, next) {
    try {
      const menuItems = await menuService.getAllMenuItems();

      res.status(200).json(menuItems);
    } catch (e) {
      next(e);
    }
  }

  async itemById(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log('Validation errors: ', errors.array());
        return;
      }

      const menuItem = await menuService.getMenuItemById(req.params.id);

      res.status(200).json(menuItem);
    } catch (e) {
      next(e);
    }
  }

  async updateItem(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        throw ApiError.BadRequest(
          'Validacijos klaida',
          validationErrors.array()
        );

      const updatedMenuItem = await menuService.updateMenuItem(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedMenuItem);
    } catch (e) {
      next(e);
    }
  }

  async removeItem(req, res, next) {
    try {
      const remove = menuService.removeMenuItem(req.params.id);

      res.status(200).json(remove);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MenuController();

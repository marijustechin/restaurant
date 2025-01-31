const { validationResult } = require("express-validator");
const categoryService = require("../services/category.service");
const ApiError = require("../exceptions/api.errors");

class CategoryController {
  async newCategory(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        throw ApiError.BadRequest(
          "Validacijos klaida",
          validationErrors.array()
        );

      const { category_name } = req.body;

      const newCategory = await categoryService.addCategory(category_name);

      res.status(200).json(newCategory);
    } catch (e) {
      next(e);
    }
  }

  async editCategory(req, res, next) {
    try {
      res.status(200).json(req.params.id);
    } catch (e) {
      next(e);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      res.status(200).json(req.params.id);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      res.status(200).json(req.params.id);
    } catch (e) {
      next(e);
    }
  }

  async getAllCategories(req, res, next) {
    try {
      const allCategories = await categoryService.getAllCategories();

      res.status(200).json(allCategories);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoryController();

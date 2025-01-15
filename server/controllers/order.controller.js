const { validationResult } = require("express-validator");
const orderService = require("../services/order.service");

class OrderController {
  async createOrder(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      res.status(200).json(req.body);
    } catch (e) {
      next(e);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      res.status(200).json(req.params);
    } catch (e) {
      next(e);
    }
  }

  async getOrder(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      res.status(200).json(req.params);
    } catch (e) {
      next(e);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      res.status(200).json(req.params);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new OrderController();

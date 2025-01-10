const { validationResult } = require("express-validator");
const userService = require("../services/user.service");

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      const { first_name, email, password } = req.body;

      const newUser = await userService.registration(
        first_name,
        email,
        password
      );

      res.status(200).json({
        data: newUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      return res.status(200).json(deletedUser);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();

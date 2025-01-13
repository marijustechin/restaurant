const bcrypt = require("bcryptjs");
const sequelize = require("../db");
const { user, user_secret, role } = sequelize.models;
//const { user } = require("../models/user.model");
const ApiError = require("../exceptions/api.errors");
const UserDto = require("../dtos/user.dto");

class UserService {
  async registration(first_name, email, password) {
    // patikrinam ar pastas neuzimtas
    console.log(user);
    const existingEmail = await user.findOne({ where: { email } });
    if (existingEmail)
      throw ApiError.BadRequest(`El. pašto adresas ${email} jau naudojamas`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create(
      {
        first_name,
        email,
        role: [{ role_name: "USER" }],
        user_secret: [{ password: hashedPassword }],
      },
      {
        include: [role, user_secret],
      }
    );

    const userDto = new UserDto(newUser);

    return userDto;
  }

  async getAllUsers() {
    const users = await user.findAll();

    let usersDto = [];

    users.forEach((user) => {
      let usr = new UserDto(user);
      usersDto = [...usersDto, usr];
    });

    return usersDto;
  }

  async deleteUser(id) {
    const user = await user.destroy({ where: { id } });
    return new UserDto(user);
  }
}

module.exports = new UserService();

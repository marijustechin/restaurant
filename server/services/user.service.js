const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const ApiError = require("../exceptions/api.errors");
const UserDto = require("../dtos/user.dto");

class UserService {
  async registration(first_name, email, password) {
    // patikrinam ar pastas neuzimtas
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail)
      throw ApiError.BadRequest(`El. pašto adresas ${email} jau naudojamas`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      email,
      password: hashedPassword,
    });

    const userDto = new UserDto(newUser);

    return userDto;
  }

  async getAllUsers() {
    const users = await User.findAll();

    let usersDto = [];

    users.forEach((user) => {
      let usr = new UserDto(user);
      usersDto = [...usersDto, usr];
    });

    return usersDto;
  }

  async deleteUser(id) {
    const user = await User.destroy({ where: { id } });
    return new UserDto(user);
  }
}

module.exports = new UserService();

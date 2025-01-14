const bcrypt = require("bcryptjs");
const sequelize = require("../db");
const { user, user_secret, role } = sequelize.models;
const ApiError = require("../exceptions/api.errors");
const UserDto = require("../dtos/user.dto");

class UserService {
  async #getUserByEmail(email) {
    return await user.findOne({
      where: { email },
      include: user_secret,
    });
  }

  async registration(first_name, email, password) {
    // patikrinam ar pastas neuzimtas
    const existingEmail = await user.findOne({ where: { email } });
    if (existingEmail)
      throw ApiError.BadRequest(`El. pašto adresas ${email} jau naudojamas`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const roleId = await role.findOne({ where: { role_name: "USER" } });

    const newUser = await user.create(
      {
        first_name,
        email,
        role_id: roleId.id,
        user_secret: [{ password: hashedPassword }],
      },
      {
        include: [user_secret],
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

  async getUser(id) {
    const foundUser = await user.findOne({ where: { id } });
    const userDto = new UserDto(foundUser);
    return userDto;
  }

  async userlogin(email, password) {
    const activeUser = await this.#getUserByEmail(email);
    if (!activeUser)
      throw ApiError.BadRequest(
        `Neteisingas el. pašto adresas arba slaptažodis`
      );

    const valid = await bcrypt.compare(
      password,
      activeUser.dataValues.user_secret.dataValues.password
    );

    if (!valid) {
      throw ApiError.BadRequest(
        `Neteisingas el. pašto adresas arba slaptažodis`
      );
    } else {
      return new UserDto(activeUser);
    }
  }

  async userUpdate(id, data) {
    const foundUser = await user.findOne({ where: { id } });

    if (!foundUser) throw ApiError.BadRequest("Naudotojas tokiu Id nerastas");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await foundUser.update(data);
    await foundUser.save();

    return new UserDto(foundUser);
  }

  async deleteUser(id) {
    const foundUser = await user.findOne({ where: { id } });

    if (!foundUser) throw ApiError.BadRequest("Naudotojas tokiu Id nerastas");

    await foundUser.destroy();

    return { success: "success" };
  }
}

module.exports = new UserService();

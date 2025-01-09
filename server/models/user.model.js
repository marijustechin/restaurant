const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "pranesimas del vardo",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: "Toks el. pasto adresas jau naudojamas",
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: "El. pastas privalomas",
      },
      notEmpty: {
        msg: "El. pastas privalomas",
      },
      isEmail: {
        msg: "Neteisingas el. pasto formatas",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Slaptazodis privalomas",
      },
      notEmpty: {
        msg: "Slaptazodis privalomas",
      },
    },
  },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING, allowNull: true },
});

module.exports = User;

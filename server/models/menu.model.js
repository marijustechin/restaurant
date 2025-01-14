const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("menu_item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "menuitem-placeholder.jpg",
    },
  }),
    sequelize.define(
      "category",
      {
        category_name: {
          type: DataTypes.STRING(128),
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: false,
      }
    );
};

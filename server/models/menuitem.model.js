const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("menu_item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  }),
    sequelize.define(
      "category",
      {
        category_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
};

// const sequelize = require("../db");
// const { DataTypes } = require("sequelize");

// const MenuItem = sequelize.define("menu_item", {
// name: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// description: {
//   type: DataTypes.TEXT,
// },
// price: {
//   type: DataTypes.FLOAT,
// },
// });

// const Category = sequelize.define("category", {
// category_name: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// });

// // MenuItem.hasOne(Category);
// // Category.belongsTo(MenuItem);

// module.exports = { MenuItem, Category };

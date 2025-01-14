const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    total: {
      type: DataTypes.FLOAT,
    },
  }),
    sequelize.define("order_status", {
      status_name: {
        type: DataTypes.STRING,
        defaultValue: "placed",
      },
    }),
    sequelize.define("order_items", {
      quantity: {
        type: DataTypes.INTEGER,
      },
    });
};

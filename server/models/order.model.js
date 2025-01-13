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

// const sequelize = require("../db");
// const { DataTypes } = require("sequelize");

// const Order = sequelize.define("order", {
//   total: {
//     type: DataTypes.FLOAT,
//   },
// });

// const OrderStatus = sequelize.define("order_status", {
//   status_name: {
//     type: DataTypes.STRING,
//     defaultValue: "placed",
//   },
// });

// const OrderItems = sequelize.define("order_items", {
//   quantity: {
//     type: DataTypes.INTEGER,
//   },
// });

// // lenteliu sarysiai
// // one to many
// // Order.hasOne(OrderStatus);
// // OrderStatus.belongsTo(Order);

// // nesugalvojau
// //Order.belongsTo(User);

// module.exports = { Order, OrderStatus, OrderItems };

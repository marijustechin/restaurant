function modelRelations(sequelize) {
  const {
    user,
    role,
    user_secret,
    order,
    order_status,
    order_items,
    menu_item,
    category,
  } = sequelize.models;

  // useris
  user.belongsTo(role, { foreignKey: "role_id" });
  user.hasOne(user_secret, { foreignKey: "user_id" });
  user.hasMany(order);

  user_secret.belongsTo(user, { foreignKey: "user_id" });

  // role
  role.hasMany(user, { foreignKey: "role_id" });

  // patiekalai
  category.hasMany(menu_item, { foreignKey: "category_id" });
  menu_item.belongsTo(category, { foreignKey: "category_id" });
  menu_item.hasMany(order_items);
  order_items.belongsTo(menu_item);

  // uzsakymai
  order.belongsTo(user);
  order.hasOne(order_status);
  order_status.belongsTo(order);
  order.hasMany(order_items);
  order_items.belongsTo(order);
}

module.exports = { modelRelations };

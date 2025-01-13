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
  user.belongsTo(role);
  user.hasOne(user_secret);
  user.hasMany(order);

  user_secret.belongsTo(user);

  // role
  role.hasMany(user);

  // patiekalai
  category.hasMany(menu_item);
  menu_item.belongsTo(category);
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

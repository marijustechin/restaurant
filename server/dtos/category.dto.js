const sequelize = require("../db");
const { menu_item } = sequelize.models;

module.exports = class CategoryDto {
  id;
  category_name;
  menus_count;

  constructor(model, count) {
    this.id = model.id;
    this.category_name = model.category_name;
    this.menus_count = count;
  }

  static async init(model) {
    // suskaiciuojam, kiek patiekalu priklauso sitai kategorijai
    const menus = await menu_item.findAll({ where: { category_id: model.id } });

    return new CategoryDto(model, menus.length);
  }
};

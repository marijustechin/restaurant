const sequelize = require("../db");
const { menu_item, category } = sequelize.models;
const ApiError = require("../exceptions/api.errors");
const menuDto = require("../dtos/menu.dto");

class MenuService {
  async getAllMenuItems(limit, page) {
    let menuItems;

    if (limit && page) {
      // pagination realizavimas
      return "Cia bus puslapiavimas";
    } else {
      //gaunam visus
      menuItems = await menu_item.findAll();
    }

    let menuItemsDtos = [];

    for (const menuItem of menuItems) {
      menuItemsDtos.push(new menuDto(menuItem));
    }

    return menuItemsDtos;
  }

  async createMenuItem(name, description, price, category_id, image) {
    const newMenuItem = await menu_item.create({
      name,
      description,
      price,
      category_id,
      image,
    });

    return new menuDto(newMenuItem);
  }

  async getMenuItemById(id) {
    const menuItem = await menu_item.findOne({ where: { id } });

    if (!menuItem) throw ApiError.BadRequest(`Netinkamas id=${id}`);

    return new menuDto(menuItem);
  }

  async updateMenuItem(id, data) {
    const itemToUpdate = await menu_item.findOne({ where: { id } });

    if (!itemToUpdate) throw ApiError.BadRequest("Tokio patiekalo nera");

    itemToUpdate.update(data);

    return new menuDto(itemToUpdate);
  }

  async removeMenuItem(id) {
    const itemToRemove = await menu_item.findOne({ where: { id } });

    if (!itemToRemove) throw ApiError.BadRequest("Tokio patiekalo nera");

    await itemToRemove.destroy();
    return { status: "success" };
  }
}

module.exports = new MenuService();

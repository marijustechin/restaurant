const sequelize = require('../db');
const CategoryDto = require('../dtos/category.dto');
const { category } = sequelize.models;
const ApiError = require('../exceptions/api.errors');

class CategoryService {
  async addCategory(category_name) {
    // ar DB yra kategorija tokiu pavadinimu
    const existingCategory = await category.findOne({
      where: { category_name },
    });

    if (existingCategory)
      throw ApiError.BadRequest(
        `Kategorija ${category_name} jau yra duomenų bazėje`
      );

    const newCategory = await category.create({ category_name });

    return newCategory;
  }

  async getAllCategories() {
    const allCategories = await category.findAll();

    let categoriesDtos = [];
    let cat;

    for (const category of allCategories) {
      cat = await CategoryDto.init(category);
      categoriesDtos.push(cat);
    }

    return categoriesDtos;
  }

  async deleteCategory(catId) {
    return await category.destroy({ where: { id: catId } });
  }

  async updateCategory(catId, catName) {
    const cat = await category.findOne({ where: { id: catId } });

    cat.category_name = catName;
    cat.save();

    return await CategoryDto.init(cat);
  }
}

module.exports = new CategoryService();

module.exports = class MenuDto {
  name;
  description;
  price;
  category_id;
  image;

  constructor(model) {
    this.name = model.name;
    this.description = model.description;
    this.price = model.price;
    this.category_id = model.category_id;
    this.image = model.image;
  }
};

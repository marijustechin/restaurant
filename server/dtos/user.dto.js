module.exports = class UserDto {
  id;
  first_name;
  email;
  role;

  constructor(model) {
    // cia model perduodamas objektas su laukais
    this.id = model.id;
    this.first_name = model.first_name;
    this.email = model.email;
    this.role = model.role;
  }
};

module.exports = class UserDto {
  id;
  first_name;
  email;
  role_id;
  address;
  phone_number;

  constructor(model) {
    // cia model perduodamas objektas su laukais
    this.id = model.id;
    this.first_name = model.first_name;
    this.email = model.email;
    this.role_id = model.role_id;
    this.address = model.address;
    this.phone_number = model.phone_number;
  }
};

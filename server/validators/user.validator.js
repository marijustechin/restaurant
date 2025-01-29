const { body } = require("express-validator");

exports.register = [
  body("first_name").trim(),
  body("email").trim(),
  body("password").trim(),
];

exports.login = [body("email").trim()];

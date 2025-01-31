const { body } = require("express-validator");

exports.newCategory = [
  body("category_name")
    .trim()
    .isLength({ min: 6, max: 32 })
    .withMessage(
      "Kategorijos pavadinimą turi sudaryti ne mažiau kaip 3 ir ne daugiau kaip 32 simboliai"
    )
    .matches(/^[A-zÀ-ž0-9_-\s]*$/)
    .withMessage(
      "Kategorijos pavadinimas turi būti sudarytas iš skaičių ir raidžių"
    ),
];

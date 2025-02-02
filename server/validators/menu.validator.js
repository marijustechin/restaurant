const { body, param } = require('express-validator');

exports.menuItem = [
  body('name').trim(),
  body('description').trim(),
  body('image').trim(),
  body('category_id').trim(),
  body('price').trim(),
];

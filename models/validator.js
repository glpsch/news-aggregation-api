const validate = require('mongoose-validator');

const urlValidator = validate({
  validator: 'isURL',
  message: 'Здесь должна быть ссылка',
});

const emailValidator = validate({
  validator: 'isEmail',
  message: 'Введите корректный адрес электронной почты',
});

module.exports = { urlValidator, emailValidator };

const routerAuth = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const { checkPassword } = require('../middlewares/check-password');

// TODO валидация?

routerAuth.post('/signup', checkPassword, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);

routerAuth.post('/signin', checkPassword, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

module.exports = routerAuth;

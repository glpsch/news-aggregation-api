const routerUsers = require('express').Router();
const { getUserInfo } = require('../controllers/users');

routerUsers.get('/me', getUserInfo);

module.exports = routerUsers;

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// валидация?

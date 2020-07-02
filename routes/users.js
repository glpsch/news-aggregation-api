const routerUsers = require('express').Router();
const { getUserInfo } = require('../controllers/users');

routerUsers.get('/me', getUserInfo);

module.exports = routerUsers;

// TODO валидация?

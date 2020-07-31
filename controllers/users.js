const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} = require('../errors/errors');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
  // .orFail(() => { throw new NotFoundError('Для просмотра личной информации войдите на сайт'); })
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      let error = err;
      if (err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      next(error);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.init()
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({ data: user.omitPrivate() }))
    .catch((err) => {
      let error = err;
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      if (err.code === 11000) {
        error = new ConflictError('Пользователь с таким адресом почты уже существует');
      }
      next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send(user.omitPrivate());
    })
    .catch((err) => {
      let error = err;
      if (err.name === 'JsonWebTokenError' || err.name === 'Error') {
        error = new UnauthorizedError('Ошибка авторизации');
      }
      next(error);
    });
};

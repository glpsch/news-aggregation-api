const jwt = require('jsonwebtoken');
const { JWT_DEV } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizedError } = require('../errors/errors');

const handleAuthError = (req, res, next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return handleAuthError(req, res, next);
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    // payload = jwt.verify(token, JWT_DEV);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);
  } catch (err) {
    return handleAuthError(req, res, next);
  }

  req.user = payload;

  next();
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res
//       .status(401)
//       .send({ message: 'Необходима авторизация' });
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     return res
//       .status(401)
//       .send({ message: 'Необходима авторизация' });
//   }

//   req.user = payload; // записываем пейлоуд в объект запроса

//   next(); // пропускаем запрос дальше
// };

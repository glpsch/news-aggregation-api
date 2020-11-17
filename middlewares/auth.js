const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const { UnauthorizedError } = require('../errors/errors');

const handleAuthError = (req, res, next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

// cookies

// module.exports = (req, res, next) => {
//   if (!req.cookies.jwt) {
//     return handleAuthError(req, res, next);
//   }

//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     return handleAuthError(req, res, next);
//   }
//   req.user = payload;
//   return next();
// };

// local storage
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(req, res, next);
  }
  req.user = payload;
  return next();
};

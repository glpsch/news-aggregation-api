const {
  BadRequestError,
} = require('../errors/errors');

module.exports.checkPassword = (req, res, next) => {
  const { password } = req.body;
  // password.trim().length < 6 ?
  if (!password || !password.trim() || password.length < 6) {
    throw new BadRequestError('Длина пароля должна быть не менее 6 символов');
  } else {
    next();
  }
};

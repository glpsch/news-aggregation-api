const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { urlValidator, emailValidator } = require('./validator');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    // index: true,
    validate: emailValidator,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});




userSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
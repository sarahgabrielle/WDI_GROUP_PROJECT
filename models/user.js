// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
//
// const userSchema = new mongoose.Schema({
//   // name: { type: String, required: true },
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String }
// });
//
// userSchema
//   .virtual('passwordConfirmation')
//   .set(function setPasswordConfirmation(passwordConfirmation) {
//     this._passwordConfirmation = passwordConfirmation;
//   });
//
// userSchema.pre('validate', function checkPassword(next) {
//   if(!this.password && !this.githubId) {
//     this.invalidate('password', 'required');
//   }
//   if(this.isModified('password') && this._passwordConfirmation !== this.password){
//     this.invalidate('passwordConfirmation', 'does not match');
//   }
//   next();
// });
//
// userSchema.pre('save', function hashPassword(next) {
//   if(this.isModified('password')) {
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
//   }
//   next();
// });
//
// userSchema.methods.validatePassword = function validatePassword(password) {
//   return bcrypt.compareSync(password, this.password);
// };
//
// module.exports = mongoose.model('User', userSchema);
const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

userSchema
  .path('email')
  .validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  virtuals: true,
  getters: true,
  setters: true,
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.password;
    delete ret.passwordConfirmation;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);

function setPassword(value){
  this._password    = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }

    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

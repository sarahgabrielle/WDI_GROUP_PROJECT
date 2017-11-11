const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User
    .create(req.body.user)
    .then(user => {
      const payload = { _id: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });
      return res.status(200).json({
        message: 'Thanks for registering.',
        token
      });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      const payload = { _id: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });
      return res.status(200).json({
        message: 'Welcome back!',
        token
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};

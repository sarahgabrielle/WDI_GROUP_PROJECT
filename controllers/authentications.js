const User       = require('../models/user');
const jwt        = require('jsonwebtoken');
const { secret } = require('../config/environment');

function authenticationsRegister(req, res){
  User
    .create(req.body)
    .then(user => {
      console.log(user);
      const payload = { userId: user.id };
      const token = jwt.sign( payload, secret, { expiresIn: '1hr' });

      return res.status(201).json({
        message: `Welcome ${user.username}!`,
        token,
        user
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
}

function authenticationsLogin(req, res){
  User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized.' });
      }
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: '1hr' });


      return res.status(200).json({
        message: 'Welcome back.',
        token,
        user
      });
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong on the server' }));
}

module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};

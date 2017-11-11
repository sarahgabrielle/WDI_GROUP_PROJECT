const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { db } = require('../config/environment');

const User = require('../models/user');
mongoose.connect(db.development);


User.collection.drop();

User
  .create([{
    name: 'Sarah Alpay',
    username: 'sarah',
    email: 'sarah@sarah.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    name: 'Josh Sadler',
    username: 'josh',
    email: 'josh@josh.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    name: 'Jonny Hall',
    username: 'jonny',
    email: 'jonny@jonny.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} students created!`);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());

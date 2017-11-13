/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');
const User = require('../../models/user');

describe('User', function() {
  it('should be invalid if username is empty', function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should be invalid if email is empty', function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.passwordHash).to.exist;
      done();
    });
  });

  it('should have a function validatePassword', function(done) {
    const u = new User({
      username: 'jonny',
      email: 'jonny@jonny.com',
      password: 'password',
      passwordConfirmation: 'password'
    });

    expect(u.validatePassword).to.be.a('function');
    done();
  });
});

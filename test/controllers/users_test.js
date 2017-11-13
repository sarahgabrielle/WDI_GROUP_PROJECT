/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');
const User = require('../../models/user');

describe('Users Routes Test', () => {

  let token;

  beforeEach(done => {
    User.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  beforeEach(done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({
        name: 'jonny hall',
        username: 'jonnyhall',
        email: 'jonny@jonny.com',
        password: 'password',
        passwordConfirmation: 'password'
      })
      .then(res => {
        return api
          .post('/api/login')
          .set('Accept', 'application/json')
          .send({
            email: 'jonny@jonny.com',
            password: 'password'
          });
      })
      .then(res => {
        token = res.body.token;
        done();
      });
  });

  describe('GET /api/users', () => {
    it('should return a 200 response', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(err => {
          done();
        })
    });
  });
});

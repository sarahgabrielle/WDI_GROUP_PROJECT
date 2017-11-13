/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');
const User = require('../../models/user');

describe('Users Routes Test', () => {

  let token, user;

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
      user = res.body.user;
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

    it('should return an array', done => {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body).to.be.an('array');
        done();
      });
    });

    it('should return 1 user', done => {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body.length).to.eq(1);
        done();
      });
    });

    it('should return a user with a username', done => {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body[0]).to.be.a('object');
        expect(res.body[0]).to.have.property('username');
        done();
      });
    });

    it('should return a user with an email', done => {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body[0]).to.be.a('object');
        expect(res.body[0]).to.have.property('email');
        done();
      });
    });

    it('should not send passwordHash', done => {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body[0]).to.be.a('object');
        expect(res.body[0]).to.not.have.property('passwordHash');
        done();
      })
    });

    it('should not send password', done => {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body[0]).to.not.have.property('password');
        done();
      })
    });

    it('should not send passwordConfirmation', done => {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body[0]).to.not.have.property('passwordConfirmation');
        done();
      })
    });

  });

  describe('GET /api/users/:id', () => {
    it('should return a 200 response', done => {
      api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
    });

    it('should return an object', done => {
      api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body).to.be.an('object');
        done();
      });
    });

    it('should return a user with a username', done => {
      api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body).to.have.property('username');
        done();
      });
    });

    it('should return a user with an email', done => {
      api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body).to.have.property('email');
        done();
      });
    });

    it('should not return a user with a password', done => {
      api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body).to.not.have.property('password');
        done();
      });
    });

    it('should not return a user with a passwordHash', done => {
      api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body).to.not.have.property('passwordHash');
        done();
      });
    });

    it('should not return a user with a passwordConfirmation', done => {
      api
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err,res) => {
        expect(res.body).to.not.have.property('passwordConfirmation');
        done();
      });
    });
  });
});

const express = require('express');
const router  = express.Router();


const authentications = require('../controllers/authentications');
const users = require('../controllers/users');
const proxies = require('../controllers/proxies');
const venues = require('../controllers/venues');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.edit)
  .delete(users.delete);

router.route('/getEvents/:offset')
  .get(proxies.events);

router.route('/getNewEvents/:lat/:lng/:radius/:offset/:categories')
  .get(proxies.newEvents);

router.route('/getVenue/:id')
  .get(proxies.getVenue);

//REVIEWS
router.route('/venues/:id')
  .get(venues.show);
router.route('/venues/:id/comments')
  .post(venues.create);
router.route('/venues/:id/comments/:commentId')
  .delete(venues.delete);

router.all('/*', (req, res) => res.notFound());

module.exports = router;

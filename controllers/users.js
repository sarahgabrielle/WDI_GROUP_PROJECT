const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .exec()
    .then(users => res.status(200).json(users))
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.json(user);
    })
    .catch(next);
}

function usersEdit(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) return res.notFound();

      for(const input in req.body) {
        user[input] = req.body[input];
      }
      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function usersDelete(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) return res.notFound();

      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  edit: usersEdit,
  delete: usersDelete
};

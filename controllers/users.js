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
    .findByIdAndUpdate(req.params.id, req.body, { new: true})
    .exec()
    .then(User => res.status(200).json(User))
    .catch(next);
}

function usersDelete(req, res, next){
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(200))
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  edit: usersEdit,
  delete: usersDelete
};

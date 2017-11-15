const Comment = require('../models/comment');

//we need to see whether we need this to find the venue id and show that specific venue.

function createCommentRoute(req, res, next) {
  console.log(req.user);
  req.body.createdBy = req.user.userId;

  Comment
    .create(req.body)
    .then(comment => {

      return res.status(201).json(comment);
    })
    .catch(next);
}


function commentIndex(req,res,next) {
  Comment
    .find({venueId: req.params.id})
    .populate('createdBy')
    .exec()
    .then(comments => {
      return res.status(200).json(comments);
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Comment
    .findById(req.params.id)
    .exec()
    .then(comment => {
      console.log(req.user);
      // if (!comment.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      comment.remove();
    })
    .then(comment => res.status(200).json(comment))
    .catch(next);
}

module.exports = {
  create: createCommentRoute,
  delete: deleteCommentRoute,
  index: commentIndex
};

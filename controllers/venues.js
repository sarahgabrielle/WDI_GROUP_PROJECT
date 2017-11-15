const Venue = require('../models/venue');

//we need to see whether we need this to find the venue id and show that specific venue.
function showRoute(req, res, next) {
  Venue
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(venue => {
      if(!venue) return res.notFound();
      return res.status(200).json(venue);
    })
    .catch(next);
}


function createCommentRoute(req, res, next) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      if (!venue) return res.notFound();

      req.body.createdBy = req.user;
      venue.comments.push(req.body);
      venue.save();

      return res.status(200).json(venue);
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      if (!venue) return res.notFound();
      // if (!venue.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      venue.comments.id(req.params.commentId).remove();

      return venue.save();
    })
    .then(venue => res.status(201).json(venue))
    .catch(next);
}

module.exports = {
  show: showRoute,
  create: createCommentRoute,
  delete: deleteCommentRoute
};

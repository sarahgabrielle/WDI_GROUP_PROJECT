const Venue = require('../models/venue');

//we need to see whether we need this to find the venue id and show that specific venue.
function showRoute(req, res, next) {
  Venue
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(venue => {
      if(!venue) return res.notFound();
      return res.render('hotels/show', { venue });
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

      return venue.save();
    })
    .then(() => res.redirect(`/venues/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/venues/${req.params.id}`, err.toString());
      next(err);
    });
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
    .then(venue => res.redirect(`/venues/${venue.id}`))
    .catch(next);
}

module.exports = {
  show: showRoute,
  create: createCommentRoute,
  delete: deleteCommentRoute
};

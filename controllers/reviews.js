// const User = require('../models/user');
const Review = require('../models/review');

function commentCreate(req, res, next) {

  req.body.createdBy = req.user;

  Review
    .findById(req.params.id)
    .exec()
    .then(review => {
      if (!review) return res.status(404).json({ message: 'review not found.' });
      req.body.createdBy = req.user.userId;
      review.comments.push(req.body); // create an embedded record
      return review.save();
      // console.log(review);
    })
    // .then((hotel) => res.redirect(`/hotels/${hotel.id}`)) //redirect to page?
    .catch(next);
}

function commentDelete(req, res, next) {
  Review
    .findById(req.params.id)
    .exec()
    .then(review => {
      if(!review) return res.status(404).json({ message: 'No review found!'});
      const comment = review.comments.id(req.params.commentId);
      console.log('userId', req.user.userId);
      console.log('createdbyId', comment.createdBy);
      if (req.user.userId === comment.createdBy) {
        comment.remove();
        return review.save();
      } else {
        return res.status(401).json({ message: 'You are not authorised to delete this comment!'});
      }
    })
    .then(review => res.status(200).json(review))
    .catch(next);
}

module.exports = {
  create: commentCreate,
  delete: commentDelete
};

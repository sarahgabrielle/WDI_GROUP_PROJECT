const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const venueSchema = new mongoose.Schema({
  event: Number,
  //event id from eventful API
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  stars: { type: Number, required: true },
  comments: [commentSchema]
});


module.exports = mongoose.model('Venue', venueSchema);

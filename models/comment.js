const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  venueId: String,
  body: { type: String }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};



module.exports = mongoose.model('Comment', commentSchema);

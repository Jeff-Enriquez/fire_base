const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    video: {
      uri: String,
      title: String
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Comment', commentSchema);

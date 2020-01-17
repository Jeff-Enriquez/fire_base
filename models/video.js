const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    upVotes: Number,
    downVotes: Number,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }]
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);

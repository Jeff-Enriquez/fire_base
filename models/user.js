const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: 'Video',
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'Video',
    }, Boolean],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);

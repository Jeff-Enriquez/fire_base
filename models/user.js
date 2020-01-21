const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    youtubeId: String,
    name: {
      type: String,
      required: true,
    },
    avatar: String,
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
      like: Boolean,
    }],
    contributor: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);

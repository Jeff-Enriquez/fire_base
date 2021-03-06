const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: String,
    name: {
      type: String,
      required: true,
    },
    avatar: String,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    upVotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Video',
    }],
    downVotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Video',
    }],
    hearts: [{
      type: Schema.Types.ObjectId,
      ref: 'Video',
    }],
    contributor: {
      type: Boolean,
      default: false
    },
    uploadedVideos: [{
      type: Schema.Types.ObjectId,
      ref: 'Video',
    }]
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);

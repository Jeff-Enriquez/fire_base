const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
    title: String,
    genre: {
      type: String,
      enum: ['Sermon', 'Documentary', 'Song', 'Misc.'],
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }]
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Video', videoSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    title: String,
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

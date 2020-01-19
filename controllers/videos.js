const Comment = require('../models/comment');

const show = (req, res) => {
  res.render('videos/show', {
    user: req.user,
    id: req.params.id
  });
}
const newComment = (req, res) => {
  let id = req.params.id;
  let myComment = new Comment({
    text: req.body.comment,
    user: req.user._id,
    video: id,
  });
  myComment.save();
  req.user.save(function(err) {
    res.redirect(`/videos/${id}`);
  });
}

module.exports = {
  show,
  new: newComment,
}
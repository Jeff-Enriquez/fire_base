const Comment = require('../models/comment');

const show = (req, res) => {
  let id = req.params.id;
  Comment.find({video: id}).populate('user').exec((err, comments) => {
    if(err) return res.redirect(`/videos/${id}`);
    // sort comments from most recent to oldest
    comments.sort((a, b) => b.createdAt - a.createdAt);
    console.log(req.user);
    console.log(comments);
    res.render('videos/show', {
      user: req.user,
      comments,
      id,
    });
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
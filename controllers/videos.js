const Comment = require('../models/comment');

const show = (req, res) => {
  let id = req.params.id;
  Comment.find({video: id}).populate('user').exec((err, comments) => {
    if(err) return res.redirect(`/videos/${id}`);
    // sort comments from most recent to oldest
    comments.sort((a, b) => b.createdAt - a.createdAt);
    res.render('videos/show', {
      user: req.user,
      comments,
      id,
    });
  });
}

const newVid = (req, res) => {
  res.render('videos/new', {
    user: req.user
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

const deleteComment = (req, res) => {
  let id = req.params.id;
  Comment.deleteOne({_id: req.params.commentId}, (err) => {
    res.redirect(`/videos/${id}`);
  })
}

const update = (req, res) => {
  Comment.findById(req.params.commentId, (err, comment) => {
    if(err) return res.redirect(`/videos/${req.params.id}`);
    comment.text = req.body.comment;
    comment.save(function(err) {
      res.redirect(`/videos/${req.params.id}`);
    })
  })
}

module.exports = {
  show,
  new: newComment,
  delete: deleteComment,
  update,
  newVid,
}
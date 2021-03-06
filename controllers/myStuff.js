const User = require('../models/user');

const show = (req, res) => {
  let comments = {};
  req.user.populate('hearts')
  .populate('upVotes')
  .populate('downVotes')
  .populate('comments')
  .execPopulate().then(function(){
    //Group comments by video
    req.user.comments.forEach(comment => {
      if(!comments[comment.video.uri]){
        comments[comment.video.uri] = {
          title: comment.video.title,
          text: [comment.text]
        };
      } else {
        comments[comment.video.uri].text.push(comment.text);
      }
    });
  }).catch(function(err){
  }).finally(function(){
    res.render('myStuff/show', {
      user: req.user,
      hearts: req.user.hearts,
      upVotes: req.user.upVotes,
      downVotes: req.user.downVotes,
      comments,
    });
  });
}

module.exports = {
  show,
}
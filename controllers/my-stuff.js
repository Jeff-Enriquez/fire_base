const User = require('../models/user');

const show = (req, res) => {
  req.user.populate('hearts')
  .populate('upVotes')
  .populate('downVotes')
  .populate('comments')
  .execPopulate().then(function(){
  }).catch(function(err){
    console.log(err);
  }).finally(function(){
    res.render('my-stuff/show', {
      user: req.user,
      hearts: req.user.hearts,
      upVotes: req.user.upVotes,
      downVotes: req.user.downVotes,
    });
  });
}

module.exports = {
  show,
}
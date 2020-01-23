const User = require('../models/user');

const show = (req, res) => {
  req.user.populate('hearts').execPopulate().then(function(){
  }).catch(function(err){
    console.log(err);
  }).finally(function(){
    res.render('my-stuff/show', {
      user: req.user,
      videos: req.user.hearts
    });
  });
}

module.exports = {
  show,
}
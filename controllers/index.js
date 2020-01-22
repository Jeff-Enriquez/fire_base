const Video = require('../models/video');

const show = (req, res) => {
  Video.find({}, (err, videos) => {
    if(err) {
      res.render('index', {
        user: req.user,
        videos: [],
      })
    }
    res.render('index', {
      user: req.user,
      videos,
    });
  });
}

module.exports = {
  show,
}
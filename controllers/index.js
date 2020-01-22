const Video = require('../models/video');

const show = (req, res) => {
  Video.find({}, (err, videos) => {
    for(let i = 2; i < videos.length; i++){
      if(videos[i].title.length > 27){
        videos[i].title = `${videos[i].title.slice(0,27)}...`;
      }
    }
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
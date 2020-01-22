const Comment = require('../models/comment');
const Video = require('../models/video');
const axios = require('axios');

const show = (req, res) => {
  Comment.find({video: req.params.id}).populate('user').exec((err, comments) => {
    if(err) return res.redirect('/');
    // sort comments from most recent to oldest
    Video.find({uri: req.params.id}, (err, video) => {
      if(err) return res.redirect('/');
      comments.sort((a, b) => b.createdAt - a.createdAt);
      console.log(video);
      res.render('videos/show', {
        user: req.user,
        comments,
        video: video[0],
      });
    });
  });
}

const newVid = (req, res) => {
  res.render('videos/new', {
    user: req.user
  });
}

const createVid = (req, res) => {
  let url = req.body.url.split("/");
  const URI = url[url.length-1];
  Video.findOne({uri: URI}, function(err, video){
    if(video){
      res.render('videos/new', {
        user: req.user
      });
    } else {
      axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${URI}&key=AIzaSyBGbUTSEZDmevFPcfg5Orv_h0KCKflHY40`)
      .then(function (response) {
        let myVideo = new Video({
          uri: URI,
          title: response.data.items[0].snippet.title,
          genre: req.body.genre,
        });
        myVideo.save();
        req.user.uploadedVideos.push(myVideo._id);
        req.user.save();
      })
      .catch(function (error) {
        res.render('videos/new', {
          user: req.user
        });
      })
    }
  });
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
  createVid,
}
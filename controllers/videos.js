const Comment = require('../models/comment');
const Video = require('../models/video');
const User = require('../models/user');
const axios = require('axios');

const show = (req, res) => {
  Comment.find({video: req.params.id}).populate('user').exec((err, comments) => {
    if(err) return res.redirect('/');
    // sort comments from most recent to oldest
    Video.findOne({uri: req.params.id}, (err, video) => {
      if(err) return res.redirect('/');
      comments.sort((a, b) => b.createdAt - a.createdAt);
      let vote = "none";
      let heart = false;
      if(req.user) {
        if(req.user.upVotes.includes(video._id)){
          vote = "up";
        } else if (req.user.downVotes.includes(video._id)){
          vote = "down";
        }
        if(req.user.hearts.includes(video._id)){
          heart = true;
        }
      }
      res.render('videos/show', {
        user: req.user,
        comments,
        video: video,
        vote,
        heart,
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

const upVote = async (req, res) => {
  //the await allows the data to be saved
  //so it will be displayed in the redirect
  await Video.findOne({uri: req.params.id}, (err, video) => {
    if(err) return;
    if(req.user.downVotes.includes(video._id)){
      req.user.downVotes.pull(video._id);
      video.downVotes -= 1;
    }
    if(!req.user.upVotes.includes(video._id)){
      req.user.upVotes.push(video._id);
      video.upVotes += 1;
    }
    req.user.save();
    video.save();
  })
  res.redirect(`/videos/${req.params.id}`);
}

const downVote = async (req, res) => {
  await Video.findOne({uri: req.params.id}, (err, video) => {
    if(err) return;
    if(req.user.upVotes.includes(video._id)){
      req.user.upVotes.pull(video._id);
      video.upVotes -= 1;
    } 
    if(!req.user.downVotes.includes(video._id)) {
      req.user.downVotes.push(video._id);
      video.downVotes += 1;
    }
    req.user.save();
    video.save();
  })
  res.redirect(`/videos/${req.params.id}`);
}

module.exports = {
  show,
  new: newComment,
  delete: deleteComment,
  update,
  newVid,
  createVid,
  upVote,
  downVote,
}
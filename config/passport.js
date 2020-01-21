const passport = require('passport');
var YoutubeV3Strategy = require('passport-youtube-v3').Strategy
const User = require('../models/user');

passport.use(new YoutubeV3Strategy({
  clientID: process.env.YOUTUBE_CLIENT,
  clientSecret: process.env.YOUTUBE_SECRET,
  callbackURL: process.env.YOUTUBE_CALLBACK,
  scope: ['https://www.googleapis.com/auth/youtube.readonly']
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOne({ 'youtubeId': profile.id }, function(err, user) {
    if (err) return cb(err);
    if (user) {
      return cb(null, user);
    } else {
      // we have a new user via OAuth!
      var newUser = new User({
        name: profile.displayName,
        youtubeId: profile.id,
        avatar: null,
      });
      newUser.save(function(err) {
        if (err) return cb(err);
        return cb(null, newUser);
      });
    }
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
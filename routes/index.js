const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/index');
const passport = require('passport');
/* GET home page. */
router.get('/', indexCtrl.show);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

 // OAuth logout route
 router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/students');
});
module.exports = router;

const express = require('express');
const router = express.Router();
const videosCtrl = require('../controllers/videos');

/* GET users listing. */
router.get('/new', videosCtrl.newVid);
router.post('/new', videosCtrl.createVid);
router.get('/:id', videosCtrl.show);

router.post('/:id/comment', videosCtrl.new);
router.put('/:id/comment/:commentId', videosCtrl.update);
router.delete('/:id/comment/:commentId', videosCtrl.delete);

router.post('/:id/up-vote', videosCtrl.upVote);
// router.post('/:id/down-vote');
// router.post('/:id/heart');

module.exports = router;
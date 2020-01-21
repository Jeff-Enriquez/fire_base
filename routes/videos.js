const express = require('express');
const router = express.Router();
const videosCtrl = require('../controllers/videos');

/* GET users listing. */
router.get('/:id', videosCtrl.show);

router.post('/:id/comment/new', videosCtrl.new);
router.put('/:id/comment/:commentId', videosCtrl.update);
router.delete('/:id/comment/:commentId', videosCtrl.delete);

module.exports = router;
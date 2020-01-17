const express = require('express');
const router = express.Router();
const videosCtrl = require('../controllers/videos');

/* GET users listing. */
router.get('/', videosCtrl.show);

module.exports = router;
const express = require('express');
const router = express.Router();
const browseCtrl = require('../controllers/browse');

/* GET users listing. */
router.get('/', browseCtrl.show);

module.exports = router;

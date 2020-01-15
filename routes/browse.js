const express = require('express');
const router = express.Router();
const firebaseCtrl = require('../controllers/firebase');

/* GET users listing. */
router.get('/', firebaseCtrl.showBrowse);

module.exports = router;

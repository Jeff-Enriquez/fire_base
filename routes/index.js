const express = require('express');
const router = express.Router();
const firebaseCtrl = require('../controllers/firebase');
/* GET home page. */
router.get('/', firebaseCtrl.showIndex);

module.exports = router;

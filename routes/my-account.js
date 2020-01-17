const express = require('express');
const router = express.Router();
const myAccountCtrl = require('../controllers/my-account');

/* GET users listing. */
router.get('/', myAccountCtrl.show);

module.exports = router;

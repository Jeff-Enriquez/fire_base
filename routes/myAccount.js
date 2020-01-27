const express = require('express');
const router = express.Router();
const myAccountCtrl = require('../controllers/myAccount');

/* GET users listing. */
router.get('/', myAccountCtrl.show);

module.exports = router;

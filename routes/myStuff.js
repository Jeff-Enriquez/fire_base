const express = require('express');
const router = express.Router();
const myStuffCtrl = require('../controllers/myStuff');

/* GET users listing. */
router.get('/', myStuffCtrl.show);

module.exports = router;
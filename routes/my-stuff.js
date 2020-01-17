const express = require('express');
const router = express.Router();
const myStuffCtrl = require('../controllers/my-stuff');

/* GET users listing. */
router.get('/', myStuffCtrl.show);

module.exports = router;

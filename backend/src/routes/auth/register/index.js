const express = require('express');
const router = express.Router();
const { RegisterContrillers } = require('../../../controllers/registerControllers');

router.post('/register', RegisterContrillers);

module.exports = router;

const express = require('express');
const verifyToken = require('../../../middleware/authMiddleware');
const { updatePassControllers } = require('../../../controllers/updateAccountControllers/updatePassController');
const router = express.Router();

router.post('/updatepassword', verifyToken, updatePassControllers);

module.exports = router


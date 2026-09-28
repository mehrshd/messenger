const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middleware/authMiddleware');
const { requestUpdateEmailController } = require('../../../controllers/updateEmailController');

router.post('/requestUpdateEmail', verifyToken, requestUpdateEmailController);

module.exports = router
const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middleware/authMiddleware');
const { confirmUpdateEmailController } = require('../../../controllers/updateEmailController');

router.post('/confirmUpdateEmail', verifyToken, confirmUpdateEmailController);

module.exports = router
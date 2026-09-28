const express = require('express');
const upload = require('../../../middleware/uploadMiddleware');
const verifyToken = require('../../../middleware/authMiddleware');
const { UpdateProfileContriller } = require('../../../controllers/updateAccountControllers/updateProfileController');
const router = express.Router();

router.patch(
    '/updateProfile',
    verifyToken,
    upload.single('avatar'),
    UpdateProfileContriller
);

module.exports = router
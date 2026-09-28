const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/authMiddleware');
const ProfileController = require('../../controllers/profileControllers');

router.get('/profile', verifyToken, ProfileController);

module.exports = router;
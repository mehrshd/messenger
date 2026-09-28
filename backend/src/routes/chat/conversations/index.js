const express = require('express');
const verifyToken = require('../../../middleware/authMiddleware');
const { 
    getUserConversationsController, 
    deleteConversationController
} = require('../../../controllers/chatControllers/conversationController/conversationController');
const router = express.Router();


router.get(
    '/conversations',
    verifyToken,
    getUserConversationsController
);

router.delete(
    '/conversations/:conversationId',
    verifyToken,
    deleteConversationController
);

module.exports = router;
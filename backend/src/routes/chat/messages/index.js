const express = require('express');
const verifyToken = require('../../../middleware/authMiddleware');
const { sendMessageController } = require('../../../controllers/chatControllers/messagesController/sendMessageController');
const { getMessagesController } = require('../../../controllers/chatControllers/messagesController/getMessageController');

const router = express.Router();

router.post(
    '/messages', 
    verifyToken, 
    sendMessageController
);

router.get(
    '/conversations/:conversationId/messages',
    verifyToken,
    getMessagesController
);

module.exports = router;
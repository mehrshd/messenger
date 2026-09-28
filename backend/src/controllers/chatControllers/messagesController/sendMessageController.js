// const dataBase = require('../../../db');

const { sendMessageService } = require("../../../services/chatServices/messageServices/sendMessageService");

const sendMessageController = async(req, res) => {
    try {
        
        const senderId = req.user.id;
        const { targetUserId, message, replyToMessageId } = req.body;

        const result = await sendMessageService(
            senderId, 
            targetUserId, 
            message, 
            replyToMessageId
        );

        if(!result.success){
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        return res.status(201).json({
            success: true,
            message: result.message,
            messageId: result.messageId
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
}

module.exports = { sendMessageController }
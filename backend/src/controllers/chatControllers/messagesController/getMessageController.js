const {
    getMessagesService
} = require('../../../services/chatServices/messageServices/getMessageService');

const getMessagesController = async (req, res) => {

    try {

        const userId = req.user.id;
        const { conversationId } = req.params;

        const result = await getMessagesService(
            conversationId,
            userId
        );

        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            messages: result.messages
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = {
    getMessagesController
};
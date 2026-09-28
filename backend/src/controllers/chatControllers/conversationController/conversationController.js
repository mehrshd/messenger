const { 
    getUserConversationsService, 
    deleteConversationService
 } = require("../../../services/chatServices/conversationServices/conversationService");

const getUserConversationsController = async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await getUserConversationsService(userId);

        return res.status(200).json({
            success: true,
            conversations: result.conversations
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

const deleteConversationController = async (req, res) => {

    try {

        const userId = req.user.id;
        const { conversationId } = req.params;

        const result = await deleteConversationService(
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
            message: result.message
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
    getUserConversationsController,
    deleteConversationController
};
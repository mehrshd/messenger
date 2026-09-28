const { getUserConversations, deleteConversation, getConversationForUser } = require("../../../repositories/conversationRepository");

const getUserConversationsService = async(userId) => {
    
    const conversations = await getUserConversations(userId);

    return {
        success: true,
        conversations
    }
}

const deleteConversationService = async (
    conversationId,
    userId
) => {

    const conversation = await getConversationForUser(
        conversationId,
        userId
    );

    if (!conversation) {
        return {
            success: false,
            message: 'Conversation not found'
        };
    }

    await deleteConversation(conversationId);

    return {
        success: true,
        message: 'Conversation deleted successfully'
    };
};

module.exports = {
    getUserConversationsService,
    deleteConversationService
};
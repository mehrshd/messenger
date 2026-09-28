const { getMessages } = require('../../../repositories/getMessages');
const { getConversationForUser } = require('../../../repositories/conversationRepository')

const getMessagesService = async (
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

    const messages = await getMessages(
        conversationId
    );

    return {
        success: true,
        messages
    };


}

module.exports = { getMessagesService }
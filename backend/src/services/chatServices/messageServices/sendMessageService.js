const { findConversation, createConversation } = require("../../../repositories/conversationRepository");
const { createMessage } = require("../../../repositories/sendMessageRepository");


const sendMessageService = async(
    senderId,
    targetUserId,
    message,
    replyToMessageId = null
) => {

    let conversation = await findConversation(senderId, targetUserId);
    let conversationId;

    if(conversation){
        conversationId = conversation.id;
    }else{
        conversationId = await createConversation(senderId, targetUserId);
    }

    const messageId = await createMessage({
        conversationId,
        senderId,
        message,
        replyToMessageId
    });

    return {
        success: true,
        message: "message received",
        messageId,
        conversationId
    }

}

module.exports = { sendMessageService }
const dataBase = require('../db');

const createMessage = async({
    conversationId,
    senderId,
    message,
    replyToMessageId = null
}) => {

    const sql = `
        INSERT INTO messages
        (conversation_id, sender_id, message, reply_to_message_id)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await dataBase.query(sql, [
        conversationId,
        senderId,
        message,
        replyToMessageId
    ]);

    return result.insertId;

}

module.exports = { createMessage }
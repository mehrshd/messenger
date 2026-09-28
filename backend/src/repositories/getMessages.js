const dataBase = require('../db');

const getMessages = async(conversationId) => {

    const sql = `
        SELECT
            messages.id,
            messages.conversation_id,
            messages.sender_id,
            messages.message,
            messages.reply_to_message_id,
            messages.edited,
            messages.created_at,

            users.fullname,
            users.avatar,

            reply.id AS reply_id,
            reply.message AS reply_message,
            reply.sender_id AS reply_sender_id

        FROM messages
        
        JOIN users
            ON messages.sender_id = users.id
        
        LEFT JOIN messages AS reply
            ON messages.reply_to_message_id = reply.id
        
        WHERE messages.conversation_id = ?

        ORDER BY messages.created_at ASC
    `;

    const [rows] = await dataBase.query(sql, [conversationId]);

    return rows;
}

module.exports = { getMessages }
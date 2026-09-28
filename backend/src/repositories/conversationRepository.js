const dataBase = require('../db');

const findConversation = async(userId, targetUserId) => {
  
    const sql = `
        SELECT id
        FROM conversations
        WHERE
            (user1_id = ? AND user2_id = ?)
            OR
            (user1_id = ? AND user2_id = ?)
        LIMIT 1
    `;

    const [rows] = await dataBase.query(sql, [
        userId,
        targetUserId,
        targetUserId,
        userId
    ]);

    return rows[0] || null;
}

const createConversation = async(userId, targetUserId) => {
    
  const user1Id = Math.min(userId, targetUserId);
  const user2Id = Math.max(userId, targetUserId);

  const sql = `
    INSERT INTO conversations
    (user1_id, user2_id)
    VALUES (?, ?)
  `;

  const [result] = await dataBase.query(sql, [
    user1Id,
    user2Id
  ]);

  return result.insertId;
}

const getConversationForUser = async(conversationId, userId) => {

    const sql = `
        SELECT id
        FROM conversations
        WHERE id = ? 
          AND (user1_id = ? OR user2_id = ?)
        LIMIT 1
    `;

    const [rows] = await dataBase.query(sql, [
        conversationId,
        userId,
        userId
    ]);

    return rows[0] || null;
}

const getUserConversations = async(userId) => {

  const sql = `
    SELECT
      c.id AS conversation_id,  
      CASE
          WHEN c.user1_id = ? THEN u2.id
          ELSE u1.id
      END AS user_id,  
      CASE
          WHEN c.user1_id = ? THEN u2.fullname
          ELSE u1.fullname
      END AS fullname,  
      CASE
          WHEN c.user1_id = ? THEN u2.avatar
          ELSE u1.avatar
      END AS avatar,  
      m.message AS last_message,
      m.created_at AS last_message_at

    FROM conversations c

    JOIN users u1
      ON c.user1_id = u1.id

    JOIN users u2
      ON c.user2_id = u2.id

    LEFT JOIN messages m
      ON m.id = (
        SELECT m2.id
        FROM messages m2
        WHERE m2.conversation_id = c.id
        ORDER BY m2.created_at DESC, m2.id DESC
        LIMIT 1
      )

    WHERE c.user1_id = ?
      OR c.user2_id = ?

    ORDER BY m.created_at DESC;
  `;

  const [rows] = await dataBase.query(sql, [
    userId,
    userId,
    userId,
    userId,
    userId
  ]);

  return rows;

}

const deleteConversation = async (conversationId) => {
    const sql = `
        DELETE FROM conversations
        WHERE id = ?
    `;

    const [result] = await dataBase.query(sql, [
        conversationId
    ]);

    return result;
};

module.exports = { 
    findConversation, 
    createConversation, 
    getConversationForUser,
    getUserConversations,
    deleteConversation
 }
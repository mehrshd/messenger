const dataBase = require('../db');

const createVerification = async ({
    userId,
    target,
    codeHash,
    purpose,
    channel,
    expiresAt
}) => {

    const sql = `
      INSERT INTO verification_codes
      (user_id, target, code_hash, purpose, channel, expires_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await dataBase.query(sql, [
      userId,
      target,
      codeHash,
      purpose,
      channel,
      expiresAt
    ]);

    return result.insertId;

};

const getVerification = async ({
    userId,
    target,
    purpose
}) => {

    const sql = `
      SELECT id, user_id, target, code_hash, purpose, channel, expires_at, attempts
      FROM verification_codes
      WHERE user_id = ?
      AND target = ?
      AND purpose = ?
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const [rows] = await dataBase.query(sql, [
      userId,
      target,
      purpose
    ]);

    return rows[0] || null;

};

const incrementVerificationAttempts = async (id) => {
    const sql = `
        UPDATE verification_codes
        SET attempts = attempts + 1
        WHERE id = ?
    `;

    await dataBase.query(sql, [id]);
};

const deleteVerification = async (id) => {
    const sql = `
        DELETE FROM verification_codes
        WHERE id = ?
    `;

    await dataBase.query(sql, [id]);
};

module.exports = { createVerification, getVerification, incrementVerificationAttempts, deleteVerification }
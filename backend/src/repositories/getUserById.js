const dataBase = require('../db');

const getUserById = async (userId) => {
    const sql = `SELECT id, password FROM users WHERE id = ?`;

    const [rows] = await dataBase.query(sql, [userId]);

    if (rows.length === 0) {
        throw new Error("User not found");
    }

    return rows[0];
};

module.exports = { getUserById };
const dataBase = require('../../db');

const ProfileServices = async (id) => {

    const sql = `
        SELECT id, fullname, email, username, phone, bio, avatar, created_at, role
        FROM users
        WHERE id = ?
        LIMIT 1
    `;

    const [result] = await dataBase.query(sql, [id]);

    return result;
};

module.exports = { ProfileServices };
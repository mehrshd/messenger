const dataBase = require('../db');

const updatePasswordInDB = async (userId, newHashedPassword) => {

    const sql = `UPDATE users SET password = ? WHERE id = ?`;

    const [result] = await dataBase.query(
        sql,
        [newHashedPassword, userId]
    );

    return result;
};

module.exports = { updatePasswordInDB };
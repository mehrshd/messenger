const dataBase = require('../../db');

const LoginServices = async(identifier) => {

    const sql = `
     SELECT id, username, email, phone, password, fullname, avatar
     FROM users
        WHERE username = ?
        OR email = ?
        OR phone = ?
     LIMIT 1
    `;
    const identifiers = [ identifier, identifier, identifier ];
    const [rows] = await dataBase.query(sql, identifiers);

    return rows

}

module.exports = { LoginServices }
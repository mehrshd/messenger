const dataBase = require('../db');
const { hashPassword } = require('../utils/passwordHash');

const checkEmail = async(Email) => {

    const sql = `
    SELECT email FROM users
    WHERE email = ?`;

    const [rows] = await dataBase.query(sql, [Email]);

    return rows.length > 0;

}

const createUser = async(email, fullname, password) => {

    const sql = `
    INSERT INTO users (email, fullname, password)
    VALUES (?, ?, ?)`;

    const passHash = await hashPassword(password);
    const params = [email, fullname, passHash];

    const [result] = await dataBase.query(sql, params);

    return result.insertId;

}

module.exports = { checkEmail, createUser }
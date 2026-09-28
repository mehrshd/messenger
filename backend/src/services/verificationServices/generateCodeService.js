const crypto = require('crypto');
const { hashPassword } = require('../../utils/passwordHash');
const { createVerification } = require('../../repositories/verificationRepository');
const { sendVerificationEmail } = require('../../utils/sendVerificationEmail');
const dataBase = require('../../db');

const generateCodeService = async ({
    userId,
    target,
    purpose,
    channel
}) => {

    const code = crypto.randomInt(100000, 1000000);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const codeHash = await hashPassword(String(code));

    await createVerification({
        userId,
        target,
        codeHash,
        purpose,
        channel,
        expiresAt
    });

    const checkSql = `SELECT email FROM users WHERE id = ?`;
    const [row] = await dataBase.query(checkSql, [userId]);

    if (row.length === 0) {
        return {
            success: false,
            message: "User not found"
        };
    }

    const email = row[0].email;

    await sendVerificationEmail(email, code);

    return {
        success: true,
        message: "The code was sent successfully."
    }
};

module.exports = {
    generateCodeService
};
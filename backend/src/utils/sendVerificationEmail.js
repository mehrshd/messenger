require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email, code) => {

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${code}`
    });

};

module.exports = {
    sendVerificationEmail
};
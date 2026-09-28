require("dotenv").config();
const { sendVerificationEmail } = require('./src/utils/sendVerificationEmail');

const test = async () => {
    try {
        await sendVerificationEmail(
            'binferjust12@gmail.com',
            '123456'
        );

        console.log('✅ Email sent successfully');
    } catch (error) {
        console.error('❌ Email sending failed:', error);
    }
};

test();
const {
    getVerification,
    incrementVerificationAttempts,
    deleteVerification
} = require('../../repositories/verificationRepository');

const { comparePassword } = require('../../utils/passwordHash');

const verifyCodeService = async ({
    userId,
    target,
    purpose,
    code
}) => {

    const verification = await getVerification({
        userId,
        target,
        purpose
    });

    if (!verification) {
        return {
            success: false,
            message: "Verification code not found"
        };
    }

    const now = new Date();

    if (now > verification.expires_at) {
        return {
            success: false,
            message: "Verification code has expired"
        };
    }

    if (verification.attempts >= 5) {
        return {
            success: false,
            message: "Too many attempts"
        };
    }

    const isValid = await comparePassword(
        String(code),
        verification.code_hash
    );

    if (!isValid) {
        await incrementVerificationAttempts(verification.id);

        return {
            success: false,
            message: "Invalid verification code"
        };
    }

    await deleteVerification(verification.id);

    return {
        success: true,
        message: "Verification successful"
    };
};

module.exports = {
    verifyCodeService
};
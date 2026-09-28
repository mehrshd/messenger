const dataBase = require('../../db');

const {
    UpdateEmailRequestService,
    confirmUpdateEmailService
} = require("../../services/updateEmailRequestServices");

const requestUpdateEmailController = async (req, res) => {
    try {

        const { target } = req.body;
        const userId = req.user.id;

        const result = await UpdateEmailRequestService(userId, target);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


const confirmUpdateEmailController = async (req, res) => {
    try {

        const { code } = req.body;
        const userId = req.user.id;

        const sql = `
            SELECT target 
            FROM verification_codes 
            WHERE user_id = ?
            AND purpose = 'update_email'
            ORDER BY created_at DESC
            LIMIT 1`;

        const [[row]] = await dataBase.query(sql, [userId]);
        const target = row.target;

        const result = await confirmUpdateEmailService(userId, code);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        const updateSql = `
            UPDATE users
            SET email = ?
            WHERE id = ?
        `;

        await dataBase.query(updateSql, [
            target,
            userId
        ]);

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


module.exports = {
    requestUpdateEmailController,
    confirmUpdateEmailController
};
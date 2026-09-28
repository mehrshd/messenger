const dataBase = require('../../db');
const { CheckUndefined } = require('../../errors');

const UpdateProfileServices = async (
    updates,
    allowedFields,
    userId
) => {

    const result = CheckUndefined(
        updates,
        allowedFields
    );

    const fields = Object.keys(result);
    const values = Object.values(result);

    if (fields.length === 0) {
        return {
            success: false,
            message: "No fields to update"
        };
    }
    
    if(result.username !== undefined){

        const checkSql = `
            SELECT id
            FROM users
            WHERE username = ?
            AND id != ?
        `;

        const [checkResult] = await dataBase.query(
            checkSql,
            [result.username, userId]
        );

        if (checkResult.length > 0) {
            return {
                success: false,
                message: "Username is already taken."
            };
        }
    }

    const setQuery = fields
        .map(field => `${field} = ?`)
        .join(", ");

    const sql = `
        UPDATE users
        SET ${setQuery}
        WHERE id = ?
    `;

    const [dbResult] = await dataBase.query(
        sql,
        [...values, userId]
    );

    return {
        success: true,
        message: "Profile updated successfully.",
        dbResult
    };
};

module.exports = {
    UpdateProfileServices
};
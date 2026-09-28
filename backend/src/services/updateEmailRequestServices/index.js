const dataBase = require('../../db');
const { generateCodeService } = require('../verificationServices/generateCodeService');
const { verifyCodeService } = require('../verificationServices/verifyCodeService');


const UpdateEmailRequestService = async(userId, target) => {
  
    const checkSql = `SELECT email FROM users WHERE id = ?`;
    const [row] = await dataBase.query(checkSql, [userId]);

    if (row.length === 0) {
        return {
            success: false,
            message: "User not found"
        };
    }

    const email = row[0].email;

    if(target && email !== target){
        const values = { 
           userId,
           target,
           purpose: "update_email",
           channel: "email"
        }
    return await generateCodeService(values);
    }
}

const confirmUpdateEmailService = async(userId, code) => {
   
    const sql = `
    SELECT target, purpose 
    FROM verification_codes 
    WHERE user_id = ?
      AND purpose = 'update_email'
    ORDER BY created_at DESC
    LIMIT 1`;
    const [result] = await dataBase.query(sql, [userId]);

    if(result.length !== 0){
        
      const rows = result[0];
      const values = { 
        userId,
        target: rows.target,
        purpose: rows.purpose,
        code,
    }

    return await verifyCodeService(values);

    }else{

        return {
         success: false,
         message: "Verification code not found"
        };
    }
}

module.exports = { UpdateEmailRequestService, confirmUpdateEmailService }
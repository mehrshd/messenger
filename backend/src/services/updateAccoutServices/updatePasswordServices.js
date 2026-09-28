const { ErrorValidations } = require("../../errors");
const { getUserById } = require("../../repositories/getUserById");
const { comparePassword, hashPassword } = require("../../utils/passwordHash");
const { updatePasswordInDB } = require("../../utils/updatePasswordInDB");

const UpdatePassword = async(userId, currentPassword, newPassword) => {

    console.log("1 - service");

    try {
        
     if(!userId || !currentPassword || !newPassword){
        return {
            success: false,
            message: "Missing required fields"
        }
     }

     if (currentPassword === newPassword) {
        return {
            success: false,
            message: "New password must be different from current password"
        }
     }

     console.log("before validation");
     const checkPassNew = ErrorValidations({
        password: newPassword,
        fields: ["password"]
     });

     console.log("after validation:", checkPassNew);

     if(checkPassNew.length > 0){
        return {
            success: false,
            message: checkPassNew[0]
        }
     }

     console.log("before getUserById");
     const user = await getUserById(userId);
     console.log("2 - user:", user);
     const isPasswordValid = await comparePassword(currentPassword, user.password);
     console.log("3 - password:", isPasswordValid);

     if(!isPasswordValid){
        return {
            success: false,
            message: "Current password is incorrect"
        }
     }

     const newHashedPassword = await hashPassword(newPassword);
     console.log("4 - hashed");
     await updatePasswordInDB(userId, newHashedPassword);
     console.log("5 - database updated");

     return {
        success: true,
        message: "Password updated successfully"
     }

    } catch (error) {
    console.error("UPDATE PASSWORD ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);

    return {
        success: false,
        message: "Internal server error"
    }
 }
}

module.exports = { UpdatePassword }
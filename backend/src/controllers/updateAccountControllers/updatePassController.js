const { UpdatePassword } = require("../../services/updateAccoutServices/updatePasswordServices");

const updatePassControllers = async(req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const result = await UpdatePassword(userId, currentPassword, newPassword);

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: result.message
        });
    }

    return res.status(200).json({
      success: true,
      message: result.message
    });
}

module.exports = { updatePassControllers }
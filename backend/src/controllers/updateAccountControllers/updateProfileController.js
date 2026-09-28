const { UpdateProfileServices } = require("../../services/updateAccoutServices/updateProfileServices");

const UpdateProfileContriller = async(req, res) => {

    try {
        
      const { fullname, username, bio } = req.body;
      const userId = req.user.id;
      const updates = {
         fullname, 
         username, 
         bio,
         avatar: req.file ? `/uploads/${req.file.filename}` : undefined
      }
      const allowedFields = [
        "fullname",
        "username",
        "avatar",
        "bio"
      ];

      const result = await UpdateProfileServices(updates, allowedFields, userId);

      if(!result.success){

        return res.status(400).json({
            success: result.success,
            message: result.message
        });

      }

      return res.status(200).json({
        success: result.success,
        message: result.message
      });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

module.exports = { UpdateProfileContriller }
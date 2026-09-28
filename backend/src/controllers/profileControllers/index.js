const { ProfileServices } = require('../../services/profileServices');

const ProfileController = async (req, res) => {
    try {
        const id = req.user.id;

        const result = await ProfileServices(id);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

module.exports = ProfileController;
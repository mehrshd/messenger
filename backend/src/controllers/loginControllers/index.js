const { LoginServices } = require('../../services/loginServices');
const SendToken = require('../../token');
const { comparePassword } = require('../../utils/passwordHash');

const LoginControllers = async(req, res) => {

    const { identifier, password } = req.body;

    if(!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: " Entering a username and password is mandatory! "
      });
    }

    const rows = await LoginServices(identifier);

    try {
        
        if(rows.length === 0){
          return res.status(400).json({ success: false, message: " The username, email, or phone entered is incorrect. " })
        }

        const user = rows[0];
        const isPasswordCorrect = await comparePassword(password, user.password);

        if(isPasswordCorrect){

            const userId = user.id;
            const token = SendToken(userId);

            return res.status(200).json({
                success: true,
                message: `welcome ${ user.fullname }`,
                data:{
                  userId: user.id,
                  fullname: user.fullname,
                  username: user.username,
                  avatar: user.avatar,
                  token
                }
            });

        }else {

            return res.status(400).json({
                success: false,
                message: " The password entered is incorrect. "
            });

        }


    } catch (error) {
        
      console.error(error);

      return res.status(500).json({
         success: false,
         message: 'Internal server error',
      });

    }
}

module.exports = LoginControllers
const RegisterServices = require('../../services/registerServices');

//RegisterContrillers

const RegisterContrillers = async(req, res) => {

    const { email, fullname, password } = req.body;
    
    try {
        
        const Outputs = await RegisterServices(email, fullname, password);
        
        if(!Outputs.success){
            return res.status(400).json(Outputs.ErrorOutput);
        }

        return res.status(201).json({
            success: Outputs.success,
            message: `You're welcome, ${fullname}`,
            data:{
              email,
              fullname,
              token: Outputs.token
            },
        });

    } catch (err) {
        
        if (err.code === 'ER_DUP_ENTRY') {
             return res.status(409).json({
             success: false,
             message: 'An account has already been created with this email',
            });
        }

        console.error(err);

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });

    }
}

module.exports = { RegisterContrillers }
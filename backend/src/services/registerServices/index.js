const { DuplicateErrors, ErrorValidations } = require('../../errors');
const { checkEmail, createUser } = require('../../repositories/userRepository');
const SendToken = require('../../token');

const RegisterServices = async(email, fullname, password) => {

    const validationErrors = ErrorValidations({
        email,
        fullname,
        password,
        fields: ['email', 'fullname', 'password'],
    });

    if(validationErrors.length > 0){
        return {
            success: false,
            ErrorOutput: validationErrors[0]
        }
    }

    const rows = await checkEmail(email);

    const duplicateErrors = DuplicateErrors({
        email,
        rows,
        fields: ["email"]
    });

    if(duplicateErrors.length > 0){
      return { 
        success: false,
        ErrorOutput: duplicateErrors[0]
     }
    }

    const userId = await createUser(
        email,
        fullname,
        password
    );

    const token = SendToken(userId);

    return {
        success: true,
        token,
        fullname
    }
}

module.exports = RegisterServices
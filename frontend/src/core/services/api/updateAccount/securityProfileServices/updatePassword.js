import HandelerError from '../../../../custom/handelerError';
import http from '../../../../interceptors'

const UpdatePassword = async(newPass) => {
    try {

        const result = await http.post("/updatepassword", newPass);
        return result

    } catch (error) {
        return HandelerError(error);
    }
}


export {
    UpdatePassword,
}
import HandelerError from '../../../../custom/handelerError';
import http from '../../../../interceptors'

const RequestUpdateEmail = async(target) => {
    try {

        const result = await http.post("/requestUpdateEmail", target);
        return result

    } catch (error) {
        return HandelerError(error);
    }
}

const ConfirmUpdateEmail = async(code) => {
    try {

        const result = await http.post("/confirmUpdateEmail", code);
        return result

    } catch (error) {
        return HandelerError(error);
    }
}


export {
    RequestUpdateEmail,
    ConfirmUpdateEmail
}
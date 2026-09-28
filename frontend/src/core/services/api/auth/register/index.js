import HandelerError from '../../../../custom/handelerError';
import http from '../../../../interceptors';

const RegisterServices = async(data) => {
    try {
        
        const result = await http.post("/register", data);
        return result

    } catch (error) {
        return HandelerError(error)
    }
}

export default RegisterServices
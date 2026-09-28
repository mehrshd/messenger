import HandelerError from '../../../../custom/handelerError';
import http from '../../../../interceptors';

const LoginRes = async(data) => {
    try {
        
        const result = await http.post('/login', data, {
            headers: {"Content-Type" : "application/json"}
        });
        return result

    } catch (error) {
        return HandelerError(error);
    }
}

export default LoginRes
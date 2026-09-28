import HandelerError from '../../../custom/handelerError';
import http from '../../../interceptors'

const GetProfile = async() => {
    try {

        const result = await http.get('/profile');
        return result;

    } catch (error) {
        return HandelerError(error);
    }
}

export default GetProfile
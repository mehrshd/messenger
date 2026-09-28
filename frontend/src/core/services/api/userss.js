import HandelerError from "../../custom/handelerError";
import http from '../../interceptors'

const Userss = async() => {
    try {
        
        const result = await http.get('/users');
        return result;
        
    } catch (error) {
        return HandelerError(error)
    }
}

export default Userss
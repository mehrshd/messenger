import http from '../../../interceptors';
import HandelerError from "../../../custom/handelerError";

const SendMessage = async(data) => {
    try {
        
        const result = await http.post("/chat/messages", data);
        return result;

    } catch (error) {
        return HandelerError(error);
    }
}

export default SendMessage
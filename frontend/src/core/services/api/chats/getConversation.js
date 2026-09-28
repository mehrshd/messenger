import http from '../../../interceptors';
import HandelerError from "../../../custom/handelerError";

const GetConversations = async() => {
    try {
        
        const result = await http.get("/conversation/conversations");
        return result;
        
    } catch (error) {
        return HandelerError(error);
    }
}

export default GetConversations
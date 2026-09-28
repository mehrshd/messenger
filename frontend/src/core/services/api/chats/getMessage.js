import http from '../../../interceptors';
import HandelerError from "../../../custom/handelerError";

const GetMessage = async(conversationId) => {
    try {
        
        const result = await http.get(`/chat/conversations/${conversationId}/messages`);
        return result;
        
    } catch (error) {
        return HandelerError(error);
    }
}

export default GetMessage
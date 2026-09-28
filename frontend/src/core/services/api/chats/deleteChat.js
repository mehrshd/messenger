import http from '../../../interceptors';
import HandelerError from "../../../custom/handelerError";

const DeleteChat = async(conversationId) => {
    try {
        

        const result = await http.delete(`/conversation/conversations/${conversationId}`);
        return result;
        
    } catch (error) {
        return HandelerError(error);
    }
}

export default DeleteChat
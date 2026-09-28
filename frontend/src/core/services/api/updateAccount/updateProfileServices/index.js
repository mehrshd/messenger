import HandelerError from '../../../../custom/handelerError';
import http from '../../../../interceptors'

const UpdateProfileServices = async(data) => {
    try {

        const result = await http.patch("/updateProfile", data)
        return result

    } catch (error) {
        return HandelerError(error)
    }
}

export default UpdateProfileServices
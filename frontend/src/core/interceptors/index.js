import axios from 'axios';
import { GetToken } from '../token';

const instanc = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

instanc.interceptors.request.use(
    (config) => {
        const token = GetToken();
        
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
);

const onSuccess = (response) => {
    return response.data
}

const onError = (error) => {
    return Promise.reject(error)
}

instanc.interceptors.response.use(
    onSuccess,
    onError
);

export default instanc
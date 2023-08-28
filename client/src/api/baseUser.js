import axios from 'axios';
import { getAuth } from "firebase/auth";

const axiosUserClient = (() => {
    const getAuthToken = async () => {
        try {
            return "Bearer " + await getAuth().currentUser?.getIdToken();
        } catch(err) {
            console.log("getAuthToken", err);
        };
    };

    const instance = axios.create({
        baseURL: process.env.REACT_APP_EXPRESS_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    instance.interceptors.request.use(async (config) => {
        config.headers.Authorization = await getAuthToken();
        return config;
    });

    return instance;
})();

export default axiosUserClient;
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import settings from './GlobalVariable';

const instance = axios.create({
    baseURL: settings.apiUrl.baseUrl,
});

// instance.interceptors.request.use(
//     async (config: AxiosRequestConfig) => {
//         // const user =  JSON.parse(await UserPersistService.getPersistedUser())  as User_Model;
//         // if (user) {
//         //     config.headers = { ...config.headers, Authorization: `Bearer ${user.token}` };
//         // }
//         return config;
//     },
//     (error: AxiosError) => Promise.reject(error as AxiosError),
// );
instance.interceptors.response.use(
    async (response: AxiosResponse) => response,

    async (error: AxiosError) => {
        if (error.code == '401') {
            // UserPersistService.removePersistedUser();
            return;
        }
        return Promise.reject(error as AxiosError)
    } 
);
debugger;
export default instance;

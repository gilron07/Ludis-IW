import axios from 'axios'
import LocalStorageService from "./LocalStorageService";
import {Config} from "../Config.js"


const instance = axios.create({
  baseURL: `${Config.API_URL}/`,
  responseType: "json"
});

const localStorageService = LocalStorageService.getService()

instance.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token){
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config
      },
    error => {
      return Promise.reject(error)
    });


instance.interceptors.response.use(
    response => {
        // check if this is signin to set the jwt tokens recieved
        // response.config.url
        return response
    }, error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest.url.endsWith('/token/refresh/')){
            // router.push('login);
            return Promise.reject(error)
        }
        if (error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = localStorageService.getRefreshToken();
            return instance.post('/token/refresh/', {
                "refresh": refreshToken
            }).then(res =>{
                if (res.status ===201){
                    localStorageService.setToken(res.data['access']);
                    instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                    return instance(originalRequest);
                }
            })
        }

        return Promise.reject(error)
    });

export default instance;
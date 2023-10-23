import axios from "axios";
import queryString from "query-string";

import {apiWeb} from "./apiConfig";

const axiosWebClient = axios.create({
    baseURL: apiWeb.baseUrl,
    paramsSerializer: params => queryString.stringify({...params})
})

axiosWebClient.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axiosWebClient.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axiosWebClient.defaults.withCredentials = true;

axiosWebClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

axiosWebClient.interceptors.response.use(async (response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
})


export default axiosWebClient;
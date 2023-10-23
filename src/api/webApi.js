import axiosWebClient from './axiosWeb';

const webApi = {
    getUser: () => {
        const url = 'api/user';
        return axiosWebClient.get(url);
    },
    logout: () => {
        const url = 'api/logout';
        return axiosWebClient.post(url);
    },
    checkLogin: () => {
        const url = 'api/checkLogin';
        return axiosWebClient.get(url);

    },
    userLogin: (params) => {
        const url = 'api/login';
        return axiosWebClient.post(url, params);
    },

    userRegister: (params) => {
        const url = 'api/register';
        return axiosWebClient.post(url, params);
    },



    //admin

    // userAdmin: () => {
    //     const url = '/api/user';
    //     return axiosWeb.get(url);
    // }
}

export default webApi;
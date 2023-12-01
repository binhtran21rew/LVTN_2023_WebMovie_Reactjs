import axiosWebClient from './axiosWeb';
export const getType= {
    Movie: 'Movie',
    Cast: 'Cast',
    Genre: 'Genre',
    Trailer: 'Trailer',
    Room: 'Room',
    Schedule: 'Schedule',
}


export const getMethod={
    getAll: 'getAll',
    detail: 'detail'
}


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

    getBookingSchedule: ($movie) => {
        const url = 'api/Schedule/getBookingSchedule/' + $movie;
        return axiosWebClient.get(url);
    },
    getTicketSchedule: ($schedule) => {
        const url = 'api/Schedule/getTicket/' + $schedule;
        return axiosWebClient.get(url);
    },



    //admin=============

    // Action POST methods===========================
    create: (type, params) => {
        const url = 'api/' + getType[type] + '/create' + getType[type];
        return axiosWebClient.post(url, params);
    },
    update: (type, params) => {
        const url = 'api/' + getType[type] + '/update' + getType[type];
        return axiosWebClient.post(url, params);
    },


    // Action GET methods ==========================
    getDetails: (type, method, id) => {
        const url = 'api/' + getType[type] + '/' + getMethod[method] + '/' + id;
        return axiosWebClient.get(url);
    },

    getTrailer: (type, id) => {
        const url = 'api/'+ getType[type] + '/getTrailer/'+id;
        return axiosWebClient.get(url);
    },
    getAvailableRoom: () => {
        const url = 'api/Room/getAvailable';
        return axiosWebClient.get(url);

    },
    getSchedule:(room) => {
        const url = 'api/Schedule/getSchedule/' + room;
        return axiosWebClient.get(url);
    },
    getTypeMovie:(type) => {
        const url = 'api/Movie/getType/' + type;
        return axiosWebClient.get(url);
    },
    getContentMovie: (type) => {
        const url = 'api/Movie/getContent/' + type;
        return axiosWebClient.get(url);
    },
    // get ALL =======================================

    getAll: (type, method) => {
        const url = 'api/' + getType[type]+ '/' + getMethod[method];
        return axiosWebClient.get(url);
    },

    getMovieAdmin: (type) => {
        const url = 'api/'+ getType[type] + '/get' + getType[type];
        return axiosWebClient.get(url);
    },


    //Get page======================================
    getMoviePage: (type, $page) => {
        const url = 'api/'+ getType[type]  +'/page/'+$page;
        return axiosWebClient.get(url);
    }


}

export default webApi;
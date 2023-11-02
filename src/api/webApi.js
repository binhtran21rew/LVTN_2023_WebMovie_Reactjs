import axiosWebClient from './axiosWeb';
export const getType= {
    movie: 'movie',
    cast: 'cast',
    genre: 'genre',
    trailer: 'trailer'
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





    //admin=============

    // Action POST methods===========================

    createMovie: (params) => {
        const url = 'api/movie/createMovie';
        return axiosWebClient.post(url, params);
    },
    createCast: (params) => {
        const url = 'api/cast/createCast';
        return axiosWebClient.post(url, params);
    },
    createTrailer: (params) => {
        const url = 'api/trailer/createTrailer';
        return axiosWebClient.post(url, params);
    },
    createGenre: (params) => {
        const url = 'api/genre/createGenre';
        return axiosWebClient.post(url, params);
    },


    // Action GET methods ==========================
    getMovieDetails: (id) => {
        const url = 'api/movie/detail/'+id;
        return axiosWebClient.get(url);
    },
    getCastDetails: (id) => {
        const url = 'api/cast/detail/'+id;
        return axiosWebClient.get(url);
    },
    getTrailer: (id) => {
        const url = 'api/trailer/getTrailer/'+id;
        return axiosWebClient.get(url);
    },

    // get ALL
    getAllCasts: () => {
        const url = 'api/cast/getAll';
        return axiosWebClient.get(url);
    },
    getAllMovies: () => {
        const url = 'api/movie/getAll';
        return axiosWebClient.get(url);
    },
    getAllGenres: () => {
        const url = 'api/genre/getAll';
        return axiosWebClient.get(url);
    },


}

export default webApi;
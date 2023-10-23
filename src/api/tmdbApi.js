import axiosClient from "./axiosClient";


export const movieType= {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
    now_playing: 'now_playing'
}


const tmdbApi = {
    getMovieList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params) ;
    },

    getVideos: (id) =>{
        const url = 'movie/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (params) => {
        const url = 'search/movie';
        return axiosClient.get(url, params);
    },
    detail: (id, params) => {
        const url = 'movie/' + id;
        return axiosClient.get(url, params);
    },
    credits: (id) =>{
        const url = 'movie/'+ id +'/credits';
        return axiosClient.get(url, {params: {}});
    },
}

export default tmdbApi;
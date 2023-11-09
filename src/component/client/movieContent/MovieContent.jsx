import React, {useEffect,  useState} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay  } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './movieContent.scss';


import tmdbApi, {movieType} from '../../../api/tmdbApi';
import MovieItem from '../movieItem/MovieItem';
import webApi from '../../../api/webApi';


const MovieContent = props => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const loadMovies = async () => {
            const params = { 
                language: 'vi-VN',
                page : 2
            };
            try{
                const response = await webApi.getMoviePage(1);
                setMovies(response.slice(0,8));
            }catch(e){
                console.log(e);
            }
        }

        loadMovies();
    }, []);

    return(
        <div className="movie-content container">
            <div className="movie-wrap">
                <div className="movie-load">
                    <Swiper
                        modules = {[Autoplay,Pagination, Navigation]}
                        spaceBetween={50}
                        slidesPerView={'auto'}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        pagination={{
                            clickable: true,
                            
                        }}
                        navigation={true}
                        >
                            {
                                movies.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <MovieItem item={item}/>
                                    </SwiperSlide>
                                ))
                            }

                    </Swiper>
                </div>
            </div>
        </div>
    )
}


export default MovieContent;
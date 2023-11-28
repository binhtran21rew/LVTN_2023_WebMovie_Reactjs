import React, {useEffect,  useState} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay  } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './movieContent.scss';


import tmdbApi, {movieType} from '../../../api/tmdbApi';
import MovieItem from '../movieItem/MovieItem';
import webApi, {getType, getMethod} from '../../../api/webApi';

const contentMovie = [
    {
        id: 1,
        name: 'Phim đang chiếu',
        status: 1
    },
    {
        id: 2,
        name: 'Phim sắp chiếu',
        status: 0
    },
]



const MovieContent = props => {
    const [active, setActive] = useState(0);



    const handleToogle = (e) => {
        setActive(e);
    }
    const loadContent = <ul>
            {contentMovie.map(e => (
                <li key={e.id} name={e.status} className={active === e.status ? "active" : ''} onClick={() => handleToogle(e.status)}>{e.name}</li>
            ))}
    </ul>
    return(
        <div className="content__movie">
            <div className="sub-tab">
                {loadContent}
            </div>
            <div className="movie-content">
                <div className="movie-wrap">
                    {contentMovie.map(e => (
                        <div key={e.id} className={active === e.status ? 'movie_load  show' : 'movie_load'}>
                            <ContentItem item= {e}/>
                        </div>
                    ))}
                    
                    
                </div>
            </div>
        </div>
       
    )
}
const ContentItem = (props) => {
    const item = props.item;
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const result = await webApi.getContentMovie(item.status)
            setMovies(result);
        }

        loadData();
    }, []);
    return (
        <Swiper
            modules = {[Autoplay, Navigation]}
            spaceBetween={50}
            slidesPerView={'auto'}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
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

    )
}

export default MovieContent;
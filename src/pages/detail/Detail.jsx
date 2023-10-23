import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import './detail.scss';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import CastList from './CastList';
const Detail = () => {
    const {id} = useParams();

    const [movie, setMovie] = useState(null);
    useEffect(() => {
        const movieDetail = async () => {
            const params = {
                language: 'vi-VN',
            }
            const response = await tmdbApi.detail(id, {params});
            setMovie(response);
        }
        movieDetail();
    }, [id]);

console.log(movie);

    return (
        <div className="Detail container mb-3">
            {
                movie && (
                <div className="content">
                    <div className="content__poster">
                        <div className="content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(movie.poster_path || movie.backdrop_path)})`}}>

                        </div>
                    </div>
                    <div className="content__text">
                        <h1 className="title">
                            {movie.title || movie.name}
                        </h1>
                        <div className="genres">
                            {movie.genres && movie.genres.map((genres, i)=>(
                                <span key={i} className='genres__item'> {genres.name}</span>
                            ))}
                        </div>
                        <p className="overview">{movie.overview.length > 0 ? movie.overview: 'Dang cap nhat'}</p>
                        <div className="cast">
                            <div className="cast__header">
                                <h2>Casts</h2>
                            </div>
                            <CastList id= {movie.id} />
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}


export default Detail;
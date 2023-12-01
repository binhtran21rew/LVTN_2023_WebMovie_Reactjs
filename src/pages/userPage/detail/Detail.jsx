import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import './detail.scss';

import CastList from './CastList';
import webApi, {getType, getMethod} from '../../../api/webApi';

import {apiWeb} from '../../../api/apiConfig';
const Detail = () => {
    const {id} = useParams();

    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const movieDetail = async () => {
            const response = await webApi.getDetails(getType.Movie, getMethod.detail, id);
            setGenres(response.data.genres);
            setMovie(response.data);
        }
        movieDetail();

    }, [id]);
    return (
        <div className="Detail container mb-3">
            {
                movie && (
                <div className="content">
                    <div className="content__poster">
                        <div className="content__poster__img" style={{backgroundImage: `url(${apiWeb.baseUrl}${movie.backdrop_path})`}}>

                        </div>
                    </div>
                    <div className="content__text">
                        <h1 className="title">
                            {movie.title || movie.name}
                        </h1>
                        <div className="genres">
                            {genres && genres.map((genre, i)=>(
                                <span key={i} className='genres__item'> {genre.name}</span>
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
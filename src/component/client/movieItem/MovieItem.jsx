import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../../api/apiConfig';

import './movieItem.scss';
const MovieItem = props => {
    const item = props.item;
    return(
        <div className="movie__item" id={`movie_${item.id}`}>
            <div className="movie__item-pic" style={{backgroundImage: `url(${apiConfig.w500Image(item.poster_path)})`}}>
            </div>
            <div className="movie__item-txt">
                {item.title || item.name}
            </div>

            <div className="movie__item-over">
                <Link to={`/movie/chitiet/${item.id}`}>
                    <span className='overview'>
                        {item.overview ? item.overview :  item.title}
                    </span>
                    <span className='atc'>...</span>
                    <h3>Chi tiet</h3>
                </Link>
                <Link to={`/lichchieu/${item.id}`} className='cart-btn'>
                    Mua Ve
                </Link>
            </div>
        </div>
    )
}

export default MovieItem;
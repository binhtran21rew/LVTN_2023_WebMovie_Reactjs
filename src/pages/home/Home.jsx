import React, { useEffect} from 'react';
import webApi from "../../api/webApi";

import Carousel from '../../component/client/carousel/Carousel';

import './home.scss';
import MovieContent from '../../component/client/movieContent/MovieContent';
const Home = () => {
    const local = localStorage.getItem('auth_token');
    return(
        <div className="Home container">
            <Carousel />
            <MovieContent />
           
        </div>
    )
}

export default Home;
import React, { useEffect} from 'react';
import webApi from "../../../api/webApi";

import Carousel from '../../../component/client/carousel/Carousel';
import TicketOnline from '../../../component/client/cardContent/TiketOnline';
import './home.scss';
import MovieContent from '../../../component/client/movieContent/MovieContent';
const Home = () => {
    return(
        <div className="Home">
            <TicketOnline />
            <Carousel />
            <MovieContent />
           
        </div>
    )
}

export default Home;
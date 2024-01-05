import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './catalog.scss';

import MovieItem from '../../../component/client/movieItem/MovieItem';
import TicketOnline from '../../../component/client/cardContent/TiketOnline';

import webApi from '../../../api/webApi';
const Catalog = props => {
    const {keyword} = useParams();

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        if(keyword !== undefined){
            const search = async () => {
                try{
                    const params = {
                        type: 'movie',
                        query: keyword
                    }
                    const response = await webApi.search(params);
                    setMovies(response);
                }catch(err){
                }
            }
            search();
        }else{
            const getMovie = async () => {
                try{
                    const response = await webApi.getContentMovie(1);
                    setMovies(response);
                }catch(err){
                }
            }
            getMovie();
        }
    }, [keyword]);

    return(

        <div className='Catalog'>
            <TicketOnline />
            <div className="wrapper  container">

                <div className="section mb-3">
                    <div className="movie-grid">
                        {movies.map((item, i) => (
                            <MovieItem item={item}/>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Catalog;
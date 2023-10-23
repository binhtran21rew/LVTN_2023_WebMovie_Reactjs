import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './catalog.scss';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieItem from '../../component/client/movieItem/MovieItem';
const Catalog = props => {
    const {keyword} = useParams();

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const search = async () => {
            try{
                const params = {
                    query: keyword
                }
                const response = await tmdbApi.search({params});
                setMovies(response.results);
            }catch(err){
                console.log(err);
            }
        }
        search();
    }, [keyword]);

    return(
        <div className='Catalog container'>
            <div className="section mb-3">
                <div className="movie-grid">
                    {movies.map((item, i) => (
                        <MovieItem item={item}/>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Catalog;
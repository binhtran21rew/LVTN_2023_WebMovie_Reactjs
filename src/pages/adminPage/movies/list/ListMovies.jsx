import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import './listmovies.scss';


import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListMovies = () => {
    const [loading ,setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            const result = await webApi.getMovieAdmin(getType.Movie);
            setMovies(result)
            setLoading(false);
        }

        loadMovies();
    }, []);
    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems = movies.slice(itemPage, endPage);
    const pageCount = Math.ceil(movies.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % movies.length;
        setItemPage(newPage);
    }
    var viewDisplay = '';
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        viewDisplay = currentItems.map((data, i) => {
            return (
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.time}</td>
                    <td>{data.status}</td>
                    <td>
                        <button >
                            <FontAwesomeIcon icon={faPenToSquare} className='movie-icon'/>
                        </button>

                        <button>
                            <FontAwesomeIcon icon={faTrash} className='movie-icon'/>
                        </button>
                    </td>

                </tr>
            )
        })
    }
    return (
        <div className="ListMovie-page">
            <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>title</th>
                                <th>time</th>
                                <th>status</th>
                                <th>option</th>

                            </tr>
                        </thead>
                        <tbody>
                           {viewDisplay}
                        </tbody>
                    </table>
                    <PaginationItem handleClick={handleClick} pageCount={pageCount}/> 

                </section>
            </div>
        </div>
    )
} 

export default ListMovies;

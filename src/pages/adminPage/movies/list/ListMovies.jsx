import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

import './listmovies.scss';


import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListMovies = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
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

    const handleEdit = (id) => {
        const data = movies.find((data) => data.id === id)
        history.push({
            pathname: '/admin/detail/movie/'+ id,
            state: {data: data}
        });
        setDataEdit(data);
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
                            <FontAwesomeIcon name={data.id} icon={faPenToSquare} className='movie-icon' onClick={() => handleEdit(data.id)}/>
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

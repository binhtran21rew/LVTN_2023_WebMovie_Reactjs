import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link } from 'react-router-dom';
import swal from "sweetalert";

import './listmovies.scss';


import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListMovies = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const loadMovies = async () => {
            try{
                const result = await webApi.getMovieAdmin(getType.Movie);
                setMovies(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadMovies();
    }, []);

    useEffect(() => {
        const loadMovies = async () => {
            try{
                const result = await webApi.getMovieAdmin(getType.Movie);
                setMovies(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadMovies();
    }, [payload]);
    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;
    const endPage = itemPage + itemPerPge;
    var currentItems= '';
    if(movies.length > 0){
        currentItems = movies?.slice(itemPage, endPage);
    }
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
    }
    const handleDelete = async (id, id_detail) => {
        const param = {
            id,
            id_detail,
            type: "Delete"
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                const result = await webApi.delete(getType.Movie, param);
                if(result.status === 200){
                    swal(result.message, {
                    icon: "success",
                });
                setPayload(true);
              }else{
                  swal('Error',result.message, 'error')
              }
            } else {
            }
          });
    }
    var viewDisplay = '';
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        if(currentItems.length > 0){
            viewDisplay = currentItems.map((data, i) => {
                return (
                    <tr key={i}>
                        <td>{data.id_movie}</td>
                        <td>{data.title}</td>
                        <td>{data.time}</td>
                        <td>{data.status}</td>
                        <td>
                            <button >
                                <FontAwesomeIcon name={data.id} icon={faPenToSquare} className='movie-icon' onClick={() => handleEdit(data.id)}/>
                            </button>
    
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDelete(data.id_movie, data.id)}/>
                            </button>
                        </td>
    
                    </tr>
                )
            })

        }else{
            viewDisplay = (
                <tr className='nodata'>
                    <td colSpan={4}> No data in here!</td>
                </tr>
              )
        }
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
            <Link className='trash' to="/admin/movie_Trashed/Movie">go to trash storage</Link>

        </div>
    )
} 

export default ListMovies;

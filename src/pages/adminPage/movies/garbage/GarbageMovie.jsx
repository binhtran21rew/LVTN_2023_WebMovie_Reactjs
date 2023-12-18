import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link } from 'react-router-dom';
import swal from "sweetalert";




import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';

const GarbageMovie = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const loadMovies = async () => {
            try{
                const result = await webApi.getTrashed(getType.Movie);
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
                const result = await webApi.getTrashed(getType.Movie);
                setMovies(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadMovies();
        setPayload(false);
    }, [payload]);


    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems = movies.slice(itemPage, endPage);
    const pageCount = Math.ceil(movies.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % movies.length;
        setItemPage(newPage);
    }

    const handleRestore = (id, id_detail) => {
        const param = {
            id,
            id_detail,
            type: 'restore',
          }
          swal({
            title: "Are you sure?",
            text: "Restore your data",
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
    const handleDelete = async (id, id_detail) => {
        const param = {
            id,
            id_detail,
            type: "delete"
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
                        <td>{data.movie_id}</td>
                        <td>{data.title}</td>
                        <td>{data.status ? 'upcoming' : 'now playing'}</td>
                        <td>
                            <button >
                                <FontAwesomeIcon name={data.id} icon={faRotateRight} className='movie-icon' onClick={() => handleRestore(data.movie_id, data.id)}/>
                            </button>
    
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDelete(data.movie_id, data.id)}/>
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

export default GarbageMovie
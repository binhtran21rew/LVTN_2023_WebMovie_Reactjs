import React, {useState, useEffect} from 'react';
import { useHistory, Link  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";

import './listgenre.scss';

import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
import AdminSearch from '../../../../component/admin/search/AdminSearch';

const ListGenre = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const loadTrailer = async () => {
            try{
                const result = await webApi.getAll(getType.Genre, getMethod.getAll);
                setGenres(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadTrailer();
    }, []);
    useEffect(() => {
        const loadTrailer = async () => {
            try{
                const result = await webApi.getAll(getType.Genre, getMethod.getAll);
                setGenres(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadTrailer();
        setPayload(false);
    }, [payload]);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems = genres.slice(itemPage, endPage);
    const pageCount = Math.ceil(genres.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % genres.length;
        setItemPage(newPage);
    }
    const handleEdit = (id) => {
        const data = genres.find((data) => data.id === id)
        history.push({
            pathname: '/admin/detail/genre/'+ id,
            state: {data: data}
        });
    }
    const handleDelete = async (id) => {
        const param = {
            id,
            type: 'softDelete'
        }
        try{
            const result = await webApi.delete(getType.Genre, param);
            if(result.status === 200){
                swal('Success',result.message, 'success')
                setPayload(true)
            }else{
                swal('Error',result.message, 'error')
                
            }

        }catch(err){}
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
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>
                            <button >
                                <FontAwesomeIcon icon={faPenToSquare} className='movie-icon' onClick={() => handleEdit(data.id)}/>
                            </button>
    
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDelete(data.id)}/>
                            </button>
                        </td>
    
                    </tr>
                )
            })
        }else{
            viewDisplay = (
                <tr className='nodata'>
                    <td colSpan={3}> No data in here!</td>
                </tr>
            )
        }
    }
    return (
        <div className="ListGenre-page">
            <div className="page-header">
                <div className="title">filter genre name</div>
                <AdminSearch type='genre' filter={'name'}/>

            </div>
             <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>genre</th>
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
            <Link className='trash' to="/admin/genre_Trashed/genre">go to trash storage</Link>

        </div>
        
    )
}


export default ListGenre;
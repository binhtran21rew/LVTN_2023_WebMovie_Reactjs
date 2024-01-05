import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link } from 'react-router-dom';
import swal from "sweetalert";
import { Select} from 'antd';

import './listtrailer.scss';

import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
import AdminSearch from '../../../../component/admin/search/AdminSearch';

const ListTrailers = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [trailers, setTrailers] = useState([]);
    const [payload, setPayload] = useState(false);


    useEffect(() => {
        let mounted = true;
        const loadTrailer = async () => {
            if(mounted){
                try{
                    const result = await webApi.getAll(getType.Trailer, getMethod.getAll);
                    setTrailers(result)
                    setLoading(false);
                }catch(e){
          
                }
            }
        }

        loadTrailer();

        return () => {
            mounted = false;
        }
    }, []);

    useEffect(() => {

        const loadTrailer = async () => {
            if(payload){
                try{
                    const result = await webApi.getAll(getType.Trailer, getMethod.getAll);
                    setTrailers(result)
                    setLoading(false);
                }catch(e){
          
                }
            }
        }
        loadTrailer();

        return () => {
            setPayload(false)
        }
    }, [payload]);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems =trailers.slice(itemPage, endPage);
    const pageCount = Math.ceil(trailers.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % trailers.length;
        setItemPage(newPage);
    }

    const handleEdit = (id) => {
        const data = trailers.find((data) => data.id === id)
        history.push({
            pathname: '/admin/detail/trailer/'+ id,
            state: {data: data}
        });
    }
    const handleDelete = async (id) => {
        const param = {
            id,
            type: 'softDelete'
        }
        try{
            const result = await webApi.delete(getType.Trailer, param);
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
                        <td>{data.name_movie}</td>
                        <td>{data.key}</td>
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
                  <td colSpan={4}> No data in here!</td>
              </tr>
            )
        }
    }
    return (
        <div className="ListTrailer-page">
            <div className="page-header">
                <div className="title">filter title movie</div>
                <AdminSearch type='trailer' filter={'title'}/>

            </div>
             <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name movie</th>
                                <th>key video</th>
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

            <Link className='trash' to="/admin/trailer_Trashed/Trailer">go to trash storage</Link>
        </div>
        
    )
}


export default ListTrailers;
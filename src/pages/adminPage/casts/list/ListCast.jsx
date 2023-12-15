import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link } from 'react-router-dom';
import swal from "sweetalert";



import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListCast = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [casts, setCasts] = useState([]);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const loadCast = async () => {
            const result = await webApi.getAll(getType.Cast, getMethod.getAll);
            setCasts(result)
            setLoading(false);
        }

        loadCast();
    }, []);

    useEffect(() => {
        const loadCast = async () => {
            const result = await webApi.getAll(getType.Cast, getMethod.getAll);
            setCasts(result)
            setLoading(false);
        }

        loadCast();
        setPayload(false)
    }, [payload]);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems =casts?.slice(itemPage, endPage);
    const pageCount = Math.ceil(casts.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % casts.length;
        setItemPage(newPage);
    }
    const handleEdit = (id) => {
        const data = casts.find((data) => data.id === id)
        history.push({
            pathname: '/admin/detail/cast/'+ id,
            state: {data: data}
        });
    }
    const handleDelete = async (id) => {
        const param = {
            id,
            type: 'softDelete'
        }
        const result = await webApi.delete(getType.Cast, param);
        if(result.status === 200){
            swal('Success',result.message, 'success')
            setPayload(true)
        }else{
            swal('Error',result.message, 'error')
            
        }
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
                    <td colSpan={4}> No data in here!</td>
                </tr>
            )
        }
    }
    return (
        <div className="ListCast-page">
             <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name cast</th>
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
            <Link className='trash' to="/admin/cast_Trashed/cast">go to trash storage</Link>

        </div>
        
    )
}


export default ListCast;
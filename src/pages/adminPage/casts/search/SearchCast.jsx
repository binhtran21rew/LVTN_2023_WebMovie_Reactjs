import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link } from 'react-router-dom';
import { Select} from 'antd';
import swal from "sweetalert";


import webApi, {getType, getMethod} from '../../../../api/webApi';
import {optionsSearchMovie} from '../../../../component/content/Content';
import PaginationItem from '../../../../component/pagination/Pagination';
import AdminSearch from '../../../../component/admin/search/AdminSearch';

const SearchCast = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get("type");
    const filters = queryParameters.get("filter");
    const keyword = queryParameters.get("keyword");
    const history = useHistory();

    const [listCast, setListCast] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const getSearch = async () =>{
            const params = {
                type,
                filters, 
                keyword
            }
            const result = await webApi.searchAdmin(getType.Cast, params);
            setListCast(result);
            setLoading(false);
        }

        getSearch()

    }, [type, filters, keyword]);

    useEffect(() => {
        const getSearch = async () =>{
            const params = {
                type,
                filters, 
                keyword
            }
            const result = await webApi.searchAdmin(getType.Cast, params);
            setListCast(result);
            setLoading(false);
        }

        getSearch();
        setPayload(false);
    }, [payload]);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems =listCast?.slice(itemPage, endPage);
    const pageCount = Math.ceil(listCast.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % listCast.length;
        setItemPage(newPage);
    }
    const handleEdit = (id) => {
        const data = listCast.find((data) => data.id === id)
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
        try{
            const result = await webApi.delete(getType.Cast, param);
            if(result.status === 200){
                swal('Success',result.message, 'success')
                setPayload(true)
            }else{
                swal('Error',result.message, 'error')
                
            }

        }catch(err){

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
                    <td colSpan={3}> No data in here!</td>
                </tr>
            )
        }
    }
    return (
        <div className="ListCast-page">
            <div className="page-header">
                <div className="title">filter cast name</div>
                <AdminSearch type='cast' filter={'name'}/>

            </div>
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

export default SearchCast
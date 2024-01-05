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

const SearchMovie = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get("type");
    const filters = queryParameters.get("filter");
    const keyword = queryParameters.get("keyword");
    const history = useHistory();

    const [listMovie, setListMovie] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [payload, setPayload] = useState(false);
    const [filter, setFilter] = useState('');


    useEffect(() => {
        const getSearch = async () =>{
            const params = {
                type,
                filters, 
                keyword
            }
            const result = await webApi.searchAdmin(getType.Movie, params);
            setListMovie(result);
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
            const result = await webApi.searchAdmin(getType.Movie, params);
            setListMovie(result);
            setLoading(false);
        }

        getSearch()
        setPayload(false)
    }, [payload]);
    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;
    const endPage = itemPage + itemPerPge;
    var currentItems= '';
    if(listMovie.length > 0){
        currentItems = listMovie?.slice(itemPage, endPage);
    }
    const pageCount = Math.ceil(listMovie.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % listMovie.length;
        setItemPage(newPage);
    }

    const handleChangeFilter = (value) =>{
        setFilter(value)
    }

    const handleEdit = (id) => {
        const data = listMovie.find((data) => data.id === id)
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
                try{
                    const result = await webApi.delete(getType.Movie, param);
                    if(result.status === 200){
                        swal(result.message, {
                            icon: "success",
                        });
                        setPayload(true);
                    }else{
                        swal('Error',result.message, 'error')
                    }
                }catch(err){}
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
        <div className="page-header">
            <Select
                defaultValue="Filter"
                style={{ width: 120 }}
                onChange={handleChangeFilter}
                options={optionsSearchMovie}
                className='select-custom'
            />

            <AdminSearch type='movie' filter={filter} disabled={filter === ''}/>

        </div>
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

export default SearchMovie
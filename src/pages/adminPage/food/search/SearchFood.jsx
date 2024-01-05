import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import swal from "sweetalert";
import { Select} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


// import './listfood.scss';

import PaginationItem from '../../../../component/pagination/Pagination';
import webApi, {getType, getMethod} from '../../../../api/webApi';
import AdminSearch from '../../../../component/admin/search/AdminSearch';
import {optionSearchFood} from '../../../../component/content/Content';

const SearchFood = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get("type");
    const filters = queryParameters.get("filter");
    const keyword = queryParameters.get("keyword");
    const history = useHistory();

    const [listCombo, setListCombo] = useState([]);
    const [listFood, setListFood] = useState([]);
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
            const result = await webApi.searchAdmin(getType.ComboFood, params);
            setListCombo(result);
            setListFood(result.filter((item) => item.food.length > 0 ));
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
            const result = await webApi.searchAdmin(getType.ComboFood, params);
            setListCombo(result);
            setListFood(result.filter((item) => item.food.length > 0 ));
            setLoading(false);
        }

        getSearch()
        setPayload(false)

    }, [payload]);

    const handleChangeFilter = (value) =>{
        setFilter(value)
    }

    const [itemPageCombo, setItemPageCombo] = useState(0);
    const itemPerPgeCombo = 5;
    const endPageCombo = itemPageCombo + itemPerPgeCombo;
    const currentItemsCombo = listCombo.slice(itemPageCombo, endPageCombo);
    const pageCountCombo = Math.ceil(listCombo.length / itemPerPgeCombo);
    const handleClickCombo = (e) => {
        const newPage = (e.selected * itemPerPgeCombo)  % listCombo.length;
        setItemPageCombo(newPage);
    }

    const [itemPageFood, setItemPageFood] = useState(0);
    const itemPerPgeFood = 5;
    const endPageFood = itemPageFood + itemPerPgeFood;
    const currentItemsFood = listFood.slice(itemPageFood, endPageFood);
    const pageCountFood = Math.ceil(listFood.length / itemPerPgeFood);
    const handleClickFood = (e) => {
        const newPage = (e.selected * itemPerPgeFood)  % listFood.length;
        setItemPageFood(newPage);
    }


    const handleEditCombo = (id, detail, name) => {
        if(detail === name){
            const data = listFood.find((data) => data.id === id)
            history.push({
                pathname: '/admin/detail/food/'+ id +'?type=food',
                state: {data: data}
            });
        }else{
            const data = listCombo.find((data) => data.id === id)
            history.push({
                pathname: '/admin/detail/food/'+ id +'?type=combo',
                state: {data: data}
            });
        }

    }
    
    const handleEditFood = (id) => {
        const data = listFood.find((data) => data.id === id)
        history.push({
            pathname: '/admin/detail/food/'+ id +'?type=food',
            state: {data: data}
        });
    }
    const handleDeleteFood = (id) => {
        const param = {
            id,
            type: "Delete"
        }
        swal({
            title: "Are you sure delete?",
            text: "After deleted, this data is show in garbage store.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                    try{
                        const result = await webApi.delete(getType.Food, param);
                        if(result.status === 200){
                            swal(result.message, {
                            icon: "success",
                        });
                        setPayload(true);
                        }else{
                            swal('Error',result.message, 'error')
                        }
                    }catch(e){}
            } else {
            }
                
          });
    }

    const handleDeleteCombo = (idCombo, idFood) => {
        const param = {
            id: idFood,
            idCombo,
            type: "Delete"
        }
        swal({
            title: "Are you sure delete?",
            text: "After deleted, this data is show in garbage store.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                    try{
                        const result = await webApi.delete(getType.Food, param);
                        if(result.status === 200){
                            swal(result.message, {
                            icon: "success",
                        });
                        setPayload(true);
                        }else{
                            swal('Error',result.message, 'error')
                        }
                    }catch(e){}
            } else {
            }
                
          });
    }
    var viewDisplayCombo = '';
    var viewDisplayFood = ''
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        viewDisplayFood = currentItemsFood.map((data, i) => {
            const food = data.food[0];
            return (
                <tr key={i}>
                    <td>{food.id}</td>
                    <td>{food.name}</td>
                    <td>
                        <button >
                            <FontAwesomeIcon name={data.id} icon={faPenToSquare} className='movie-icon' onClick={() => handleEditFood(data.id)}/>
                        </button>

                        <button>
                            <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDeleteFood(food.id)}/>
                        </button>
                    </td>
                </tr>
            )
        })

        viewDisplayCombo = currentItemsCombo.map((data, i) => {
            var food = [];
            if(data.food.length !== 0){
                food = data.food[0];
            }
            return (
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.detail}</td>
                    <td>{data.price}</td>
                    <td>{data.count}</td>
                    <td>{data.name !== data.detail ? 'combo' : 'thường'}</td>
                    <td>
                        <button >
                            <FontAwesomeIcon name={data.id} icon={faPenToSquare} className='movie-icon' onClick={() => handleEditCombo(data.id, data.detail, data.name)}/>
                        </button>

                        <button>
                        <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDeleteCombo(data.id, food.id)}/>
                        </button>
                    </td>

                </tr>
            )
        })

    }
    return (
        <div className="ListFood-page">
        <div className="page-header">
            <Select
                defaultValue="Filter"
                style={{ width: 120 }}
                onChange={handleChangeFilter}
                options={optionSearchFood}
                className='select-custom'
            />
            <AdminSearch type='food' filter={filter} disabled={filter === ''}/>
        </div>
        <div className="table_movie">
            <section className="table__body" >
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name food</th>
                            <th>option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {viewDisplayFood}
                    </tbody>
                </table>
                <PaginationItem handleClick={handleClickFood} pageCount={pageCountFood}/> 

            </section>
        </div>
        <div className="table_movie">
            <section className="table__body" >
                <div className='food_title'>List Combo Food</div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name combo</th>
                            <th>detail</th>
                            <th>price</th>
                            <th>count</th>
                            <th>type</th>
                            <th>option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {viewDisplayCombo}
                    </tbody>
                </table>
                <PaginationItem handleClick={handleClickCombo} pageCount={pageCountCombo}/> 

            </section>
        </div>
       
    </div>
    )
}

export default SearchFood
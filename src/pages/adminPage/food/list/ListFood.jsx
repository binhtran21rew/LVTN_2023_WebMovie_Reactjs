import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


import './listfood.scss';

import PaginationItem from '../../../../component/pagination/Pagination';
import webApi, {getType, getMethod} from '../../../../api/webApi';

const ListFood = () => {
    const history = useHistory();
    const [listCombo, setListCombo] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [listFood, setListFood] = useState([]);
    useEffect(() => {
        const getCombo = async () => {
            const result = await webApi.getAll(getType.ComboFood, getMethod.getAll);
            setListCombo(result);
        }

        const getFood = async () => {
            const result = await webApi.getAll(getType.Food, getMethod.getAll);
            setListFood(result);
        }
        getCombo();
        getFood();
        setLoading(false);
    }, []);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems = listCombo.slice(itemPage, endPage);
    const pageCount = Math.ceil(listCombo.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % listCombo.length;
        setItemPage(newPage);
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
    var viewDisplayCombo = '';
    var viewDisplayFood = ''
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        viewDisplayCombo = currentItems.map((data, i) => {
            
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
                            <FontAwesomeIcon icon={faTrash} className='movie-icon'/>
                        </button>
                    </td>

                </tr>
            )
        })

        viewDisplayFood = listFood.map((data, i) => {
            return (
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>
                        <button >
                            <FontAwesomeIcon name={data.id} icon={faPenToSquare} className='movie-icon' onClick={() => handleEditFood(data.id)}/>
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
        <div className="ListFood-page">
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
                    <PaginationItem handleClick={handleClick} pageCount={pageCount}/> 

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
                    <PaginationItem handleClick={handleClick} pageCount={pageCount}/> 

                </section>
            </div>
        </div>
    )
}

export default ListFood
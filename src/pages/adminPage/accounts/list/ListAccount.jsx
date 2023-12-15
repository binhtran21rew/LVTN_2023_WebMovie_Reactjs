import React, {useState, useEffect, Fragment} from 'react';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


import './listaccount.scss';

import PaginationItem from '../../../../component/pagination/Pagination';
import webApi, { getMethod, getType } from '../../../../api/webApi';

const optionRoles = [
    {
        value: 'all',
        label: 'all'
    },
    {
        value: 'admin',
        label: 'admin'
    },
    {
        value: 'user',
        label: 'user'
    }
]
const ListAccount = () => {
    const history = useHistory();
    const [listAccount, setListAccount] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [listAdmin, setListAdmin] = useState([]);
    const [selectRole, setSelectRole] = useState('');


    const queryParameters = new URLSearchParams(window.location.search);
    const queryRole = queryParameters.get('role');


    useEffect(() => {
        const getList = async () => {
            const result = await webApi.getAll(getType.Account, getMethod.getAll);
            setListAccount(result);
            
        }

        getList();
        setListUser(
            listAccount.filter((data) => {
                return data.roles.some(item => {
                    if(item.name === 'user') return data;
                })
            })
        )
        setListAdmin(
            listAccount.filter((data) => {
                return data.roles.some(item => {
                    if(item.name === 'admin') return data;
                })
            })
        )
    }, []);

    // useEffect(() => {
    //     if(queryRole === 'all'){
    //         const getList = async () => {
    //             const result = await webApi.getAll(getType.Account, getMethod.getAll);
    //             setListAccount(result);
    //         }
    //         getList();
    //         setListUser(
    //             listAccount.filter((data) => {
    //                 return data.roles.some(item => {
    //                     if(item.name === 'user') return data;
    //                 })
    //             })
    //         )
    //         setListAdmin(
    //             listAccount.filter((data) => {
    //                 return data.roles.some(item => {
    //                     if(item.name === 'admin') return data;
    //                 })
    //             })
    //         )
    //     }
    // }, [queryRole]);
    // const handleSelectRole = (selectOption) => {
    //     setSelectRole(selectOption.value);
    // }
    useEffect(() => {
        if(selectRole !== ''){
            history.push(`/admin/list_account/accounts?role=${selectRole}`)
        }
        
    }, [selectRole]);

    const handleSetPermission = (id) => {
        const data = listAdmin.find((data) => data.id === id)
        history.push({
            pathname: '/admin/account/permisson/'+ id,
            state: {data: data}
        });

    }

    const [itemPageUser, setItemPageUser] = useState(0);
    const itemPerPgeUser = 5;
    const endPageUser = itemPageUser + itemPerPgeUser;
    const currentItemsUser = listUser.slice(itemPageUser, endPageUser);
    const pageCountUser = Math.ceil(listUser.length / itemPerPgeUser);
    const handleClickUser = (e) => {
        const newPage = (e.selected * itemPerPgeUser)  % listUser.length;
        setItemPageUser(newPage);
    }
    const userDisplay = (
        currentItemsUser.map((data, i) => {
            return (
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.gender}</td>
                    <td>{data.phone}</td>
                    <td>
                        {data.roles.map((item, i) => <Fragment key={i}> {item.name}</Fragment>)}

                    </td>
                </tr>
            )
        })           
    )
    
    const [itemPageAdmin, setItemPageAdmin] = useState(0);
    const itemPerPgeAdmin = 5;
    const endPageAdmin = itemPageAdmin + itemPerPgeAdmin;
    const currentItemsAdmin = listAdmin.slice(itemPageAdmin, endPageAdmin);
    const pageCountAdmin = Math.ceil(listAdmin.length / itemPerPgeAdmin);
    const handleClickAdmin = (e) => {
        const newPage = (e.selected * itemPerPgeAdmin)  % listAdmin.length;
        setItemPageAdmin(newPage);
    }
    const adminDisplay = (
        currentItemsAdmin.map((data, i) => {
            return (
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.gender}</td>
                    <td>{data.phone}</td>
                    <td>
                        {data.roles.map((item, i) => <Fragment key={i}> {item.name}</Fragment>)}

                    </td>
                    <td>
                        <button>
                            <FontAwesomeIcon icon={faEdit} className='movie-icon' onClick={() => handleSetPermission(data.id)}/>
                        </button>
                    </td>
                    <td>
                        <button >
                            {/* <FontAwesomeIcon name={data.id} icon={faPenToSquare} className='movie-icon' onClick={() => handleEditCombo(data.id, data.detail, data.name)}/> */}
                        </button>

                        <button>
                            <FontAwesomeIcon icon={faTrash} className='movie-icon'/>
                        </button>
                    </td>

                </tr>
            )
        })           
    )
        
        
        
       
    return (
        <div className="ListAccount-page">
            {/* <div className="navbar">
                <div className="type-role">
                    <span>Filter role: </span>
                    <Select options={optionRoles}  onChange={handleSelectRole} />
                </div>
            </div> */}
            <div className="table_movie">
                <section className="table__body" >
                    <div className='title'>List account admin</div>
                    <table>
                        <thead>
                            <tr>
                                <th>user id</th>
                                <th>name</th>
                                <th>email</th>
                                <th>gender</th>
                                <th>phone</th>
                                <th>role</th>
                                <th>permission</th>
                                <th>option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminDisplay}
                        </tbody>
                    </table>
                    <PaginationItem handleClick={handleClickAdmin} pageCount={pageCountAdmin}/> 
                </section>
            </div>

            <div className="table_movie">
                <section className="table__body" >
                    <div className='title'>List account user</div>
                    <table>
                        <thead>
                            <tr>
                                <th >user id</th>
                                <th>name</th>
                                <th>email</th>
                                <th>gender</th>
                                <th>phone</th>
                                <th>role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDisplay}
                        </tbody>
                    </table>
                    <PaginationItem handleClick={handleClickUser} pageCount={pageCountUser}/> 
                </section>
            </div>
        </div>
    )
}

export default ListAccount
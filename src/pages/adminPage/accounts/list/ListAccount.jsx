import React, {useState, useEffect, Fragment} from 'react';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";


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
    const [load, setLoad] = useState(true);
    const [payload, setPayload] = useState(false);


    const queryParameters = new URLSearchParams(window.location.search);
    const queryRole = queryParameters.get('role');


    useEffect(() => {
        const getList = async () => {
            try{
                const result = await webApi.getAll(getType.Account, getMethod.getAll);
                setListUser(
                    result.filter((data) => {
                        return data.roles.some(item => {
                            if(item.name === 'user') return data;
                        })
                    })
                )
                setListAdmin(
                    result.filter((data) => {
                        return data.roles.some(item => {
                            if(item.name === 'admin') return data;
                        })
                    })
                )
            }catch(e){
      
            }

        }

        getList()
        setLoad(false);
    }, []);
    useEffect(() => {
        const getList = async () => {
            try{
                const result = await webApi.getAll(getType.Account, getMethod.getAll);
                setListUser(
                    result.filter((data) => {
                        return data.roles.some(item => {
                            if(item.name === 'user') return data;
                        })
                    })
                )
                setListAdmin(
                    result.filter((data) => {
                        return data.roles.some(item => {
                            if(item.name === 'admin') return data;
                        })
                    })
                )
            }catch(e){
      
            }

        }

        getList()
        setLoad(false);
    }, [payload]);

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
    // useEffect(() => {
    //     if(selectRole !== ''){
    //         history.push(`/admin/list_account/accounts?role=${selectRole}`)
    //     }
        
    // }, [selectRole]);

    const handleSetPermission = (id) => {
        const data = listAdmin.find((data) => data.id === id)
        history.push({
            pathname: '/admin/account/permisson/'+ id,
            state: {data: data}
        });

    }
    const handleDelete = (id) => {
        const param = {
            id,
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
                try{
                    if (willDelete) {
                            const result = await webApi.delete(getType.Role, param);
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
                }catch(e){
            }
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
    
    const [itemPageAdmin, setItemPageAdmin] = useState(0);
    const itemPerPgeAdmin = 5;
    const endPageAdmin = itemPageAdmin + itemPerPgeAdmin;
    const currentItemsAdmin = listAdmin.slice(itemPageAdmin, endPageAdmin);
    const pageCountAdmin = Math.ceil(listAdmin.length / itemPerPgeAdmin);
    const handleClickAdmin = (e) => {
        const newPage = (e.selected * itemPerPgeAdmin)  % listAdmin.length;
        setItemPageAdmin(newPage);
    }
    var adminDisplay = '';
    var userDisplay ='';

    if(load){
        return (
            <h4>Loading...</h4>
        )
    }else{
        userDisplay = (
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

        adminDisplay = (
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
    
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDelete(data.id)}/>
                            </button>
                        </td>
    
                    </tr>
                )
            })           
        )
    }

    
        
        
        
       
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
                                <th>change role</th>
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
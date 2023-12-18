import React, {useState, useEffect} from 'react'
import swal from "sweetalert";

import {Link, useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import './roleaccount.scss';

import webApi, { getType } from '../../../../api/webApi';
const RoleAccount = () => {
    const history = useHistory();
    const [listRole, setListRole] = useState([]);
    const [load, setLoad] = useState(true);
    const [payload, setPayload] = useState(false);
    useEffect(() => {
        const getRole = async () => {
            try{
                const result = await webApi.getRoleAndPermission(getType.Role);
                setListRole(result);
                setLoad(false);
            }catch(e){
                
            }
        }
        
        getRole();
    }, []);

    
    useEffect(() => {
        const getRole = async () => {
            try{
                const result = await webApi.getRoleAndPermission(getType.Role);
                setListRole(result);
                setLoad(false);
            }catch(e){
                
            }
        }
        
        getRole();
        setPayload(false)
    }, [payload]);


    const handleEdit = (id) => {
        const data = listRole.find((data) => data.id === id)
        history.push({
            pathname: '/admin/detail/role/'+ id,
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


    var adminDisplay = ''
    if(load){
        return(
            <div className='RoleAccount-page'>
                <div className="RoleAccount_header">
                    <span>list role</span>

                    <div className="link_custom">
                        <div className='LinkTo'>
                            <Link to={`/admin/list_account/accounts`}>go to list account</Link>
                        </div>
                        <div className='LinkTo'>
                            <Link to={`/admin/create/role`}>create role</Link>
                        </div>
                    </div>

                </div>
                <div className="RoleAccount_body">
                    <div className="table_movie">
                        <section className="table__body" >
                <h4>loading...</h4>
                </section>
                    </div>
                </div>
            </div>
        )
    }else{
        if(listRole.length > 0){
            adminDisplay = (
                <table>
                    <thead>
                        <tr>
                            <th>role id</th>
                            <th>name</th>
                            <th>option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listRole.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.id}</td>
                                        <td>{data.name.replace('_', ' ')}</td>
                                        <td>
                                            <button >
                                                <FontAwesomeIcon name={data.id} icon={faPenToSquare} className='movie-icon' onClick={() => handleEdit(data.id)}/>
                                            </button>

                                            <button>
                                                <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDelete(data.id)}/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
            
            
            
        }
    }
    return (
        <div className='RoleAccount-page'>
            <div className="RoleAccount_header">
                <span>list role</span>

                <div className="link_custom">
                    <div className='LinkTo'>
                        <Link to={`/admin/list_account/accounts`}>go to list account</Link>
                    </div>
                    <div className='LinkTo'>
                        <Link to={`/admin/create/role`}>create role</Link>
                    </div>
                </div>

            </div>
            <div className="RoleAccount_body">
                <div className="table_movie">
                    <section className="table__body" >
                        {adminDisplay}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default RoleAccount
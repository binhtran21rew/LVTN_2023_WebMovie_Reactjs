import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


import './editrole.scss';

import {InputDefault as Input} from '../../../../../component/input/Input';
import Button from '../../../../../component/button/Button';
import {groupByPermissions} from '../../../../../component/admin/helper';
import webApi, { getType } from '../../../../../api/webApi';
const EditRole = () => {
    const location = useLocation();
    const data = location.state.data;
    const [permissions, setPermissions] = useState(data.permissions);

    const [input, setInput] = useState(data.name);
    const [listPermissions, setListPermissions] = useState([]);
    const [listSelect, setListSelect] = useState(permissions.map((data) => data.id.toString()));
    // setListSelect

    
    useEffect(() => {
        const getPermissions = async () =>{
            try{
                const result = await webApi.getRoleAndPermission(getType.Permission);
                setListPermissions(result);
            }catch(e){
                
            }
        }
        
        getPermissions();
      }, []);

    const hanldeCheckList = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if(!listSelect.includes(e.target.value)) {
          setListSelect([...listSelect, value])
        }else{
          setListSelect((prev) => {
            return prev.filter((id) => {
              return id !== value
            })
          })
        }
    }
    
    const hanldeCheckLists = (id) =>{
        if(!listSelect.includes(id.toString())){
          setListSelect([...listSelect, id.toString()])
        }else{
          setListSelect((prev) => {
            return prev.filter((i) => {
              return i !== id.toString()
            })
          })
        }
    }
    const handleShow = (i) => {
        const modal = document.getElementById(`list_${i}`);
        modal.classList.toggle('open');
    }
    const renderPermissions = () => {
        const listNamePermissions = groupByPermissions(listPermissions, 'name');
        let entries = Object.entries(listNamePermissions);
    
        if(listPermissions.length > 0){
          return entries.map(([key, value], i) => {
            return (
              <div key={i} className='list-permission' id={`list_${i}`}>
                <div className='permission'>
                  {key}
                  <FontAwesomeIcon icon={faChevronDown} onClick={() => handleShow(i)}/>
                </div>
                <ul className="list-checkbox">
                  {value.map((item, i) => 
                  {
                    const split = item.name.split(/[_-]/)
                    return (
                      <li className="item-checkbox" key={i}  onClick={() => hanldeCheckLists(item.id)}>
                        <input type='checkbox' name='permissions[]' checked={listSelect.includes(item.id.toString())} value={item.id} onChange={hanldeCheckList}/>
                        <span>{split[1]} {split[2]}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
    
            )
          })
        }
    }
    const handleInput = (e) => {
        setInput(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const dataRole = new FormData(document.getElementById('form-submit'));
            dataRole.append('id', data.id)
            const result = await webApi.update(getType.Role, dataRole);
            if(result.status === 200){
            swal('Success',result.message, 'success')
            }else{
                swal('Warn',result.message, 'warning')
            }
        }catch(e){}
    }
    return (
        <div className='EditRole-page'>
            <form onSubmit={handleSubmit} id="form-submit">
                <div className="section mb-3">
                    <label htmlFor="">role name:</label>
                    <div className="input_title">
                        <Input 
                            placeholder='Input room name...'
                            type='text'
                            name='name'
                            onChange={handleInput}
                            value={input}
                        />
                    </div>
                </div>
                {renderPermissions()}
                <Button className="movie_btn_create">Update</Button>
            </form>
        </div>
    )
}

export default EditRole
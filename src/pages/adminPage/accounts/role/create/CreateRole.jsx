import React, { useState, useEffect, Fragment } from 'react'
import {Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";


import './createrole.scss';

import {InputDefault as Input} from '../../../../../component/input/Input';
import Button from '../../../../../component/button/Button';
import webApi, { getType } from '../../../../../api/webApi';
import {groupByPermissions} from '../../../../../component/admin/helper';
const CreateRole = () => {
  const [input, setInput] = useState('');
  const [listPermissions, setListPermissions] = useState([]);
  const [listSelect, setListSelect] = useState([]);
  
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
      const data = new FormData(document.getElementById('form-submit'));
      const result = await webApi.create(getType.Role, data);
      if(result.status === 200){
        swal('Success',result.message, 'success')
    }else{
        swal('Warn',result.message, 'warning')
    }
    }catch(e){}
  }
  return (
    <div className='CreateRole-page'>
      <div className="CreateRole_header">
        <span>create role</span>

        <div className="link_custom">
            <div className='LinkTo'>
                <Link to={`/admin/role`}>go to list role</Link>
            </div>
        </div>
      </div>
      <div className="CreateRole_body">
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
          <Button className="movie_btn_create">Create</Button>

        </form>
      </div>
    </div>
  )
}

export default CreateRole
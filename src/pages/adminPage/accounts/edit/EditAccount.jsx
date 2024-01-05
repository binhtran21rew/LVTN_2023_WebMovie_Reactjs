import React, { useState, useEffect } from 'react'
import { useLocation, Link } from "react-router-dom";
import swal from "sweetalert";


import './editaccount.scss';

import { InputDefault, InputRadio } from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import { SelectCustom } from '../../../../component/input/Input';
import webApi, { getType } from '../../../../api/webApi';

const EditAccount = () => {
  const location = useLocation();
  const data = location.state.data;

  const [input, setInput] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  const [roles, setRoles] = useState(data.roles.map((data) =>  data.id))
  const [listRole, setListRole] = useState([]);
  const [listSelectRole, setListSelectRole] = useState([]);
  const [checkbox, setCheckbox] = useState(data.gender);

  useEffect(() => {
    const getRole = async () => {
        try{
            const result = await webApi.getRoleAndPermission(getType.Role);
            setListRole(result);
        }catch(e){

        }
    }
    getRole();
  }, []);

  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const dataRole = new FormData(document.getElementById('form-submit'));
      Object.keys(roles).forEach(key => dataRole.append('role[]', roles[key]));
      dataRole.append('id', data.id)

      const result = await webApi.updateAccountRole(dataRole);
      if(result.status === 200){
        swal('Success',result.message, 'success')
        }else{
            swal('Warn',result.message, 'warning')
        }
    }catch(e){}
  }

  return (

    <div className='EditAccount-page'>
     <div className="EditAccount_header">
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
     <div className="EditAccount_body">
        <form onSubmit={handleSubmit} id="form-submit">
            <div className="section mb-3">
                <label htmlFor="nameuser">
                    Username:
                </label>
                <div className="input__name">
                <InputDefault 
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleInput}
                    readOnly={true}
                    disabled={true}
                />

                </div>
            </div>
            <div className="section mb-3">
                <SelectCustom 
                    data={listRole} 
                    setListSelect={setRoles}
                    listSelect={roles}
                    name={'role'}
                />
            </div>
            <div className="section mb-3">
                <div className="tag">
                    <Button className="small btn__primary" 
                        
                    >Update</Button>
                </div>
                
            </div>
        </form>  
     </div>
 </div>


  )
}

export default EditAccount
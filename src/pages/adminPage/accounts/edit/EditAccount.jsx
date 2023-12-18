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
  const handleCheckbox = (e) => {
    setCheckbox(e.target.value);
  }
  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const dataRole = new FormData(document.getElementById('form-submit'));
      Object.keys(roles).forEach(key => dataRole.append('role[]', roles[key]));
      dataRole.append('id', data.id)

      for(var e of dataRole){
        console.log(e);
      }
      const result = await webApi.update(getType.Account, dataRole);
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
                    />
    
                    </div>
                </div>
                <div className="section mb-3">
                    <label htmlFor="emailuser">
                        Email:
                    </label>
                    <div className="input__email">
                      <InputDefault 
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={handleInput}
                      />
                    </div>
                    
                </div>
                <div className="section mb-3">
                    <label htmlFor="phoneuser">
                        Phone number:
                    </label>
                    <div className="input__phone">
                        <InputDefault 
                          type="text"
                          name="phone"
                          value={input.phone}
                          onChange={handleInput}
                        />
                    
                    </div>
                    
                </div>
                {/* <div className="section mb-3">
                    <label htmlFor="password">
                        Password:

                    </label>
                    <div className="input__password">
                        <Input 
                            type={showEye.pass ? "text" : 'password'}
                            id="password"
                            onChange = {(e) => setPwd(e.target.value)}
                            value={pwd}
                            placeholder= "enter your name"
                            name="password"
                            required
                            describedby="pwdnote"
                            invalid={validPwd ? "false" : "true"}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false) }
                        />
                        
                        {
                            showEye.pass ? <FontAwesomeIcon onClick={handleShowPass}  icon={faEye} className='input__password__display eyeDisplay'/> :
                            <FontAwesomeIcon onClick={handleShowPass} icon={faEyeSlash} className='input__password__display'/>
                        }
                        
                        
                    </div>
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        More 6 charachers.<br />
                        Must include uppercase, lowercase letters, a number.<br />
                        Allowed special characters: 
                        <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className="section mb-3">
                    <label htmlFor="comfirm_password">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <div className="input__password">
                        <Input 
                            type={showEye.confirm ? "text" : 'password'}
                            id="confirm_password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            placeholder= "enter your name"
                            name="password_confirmation"
                            required
                            describedby="comfirmNote"
                            invalid={validMatch ? "false" : "true"}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false) }
                        />
                        {
                            showEye.confirm ? <FontAwesomeIcon onClick={handleShowText}  icon={faEye} className='input__password__display eyeDisplay'/> :
                            <FontAwesomeIcon onClick={handleShowText} icon={faEyeSlash} className='input__password__display'/>
                        }
                    </div>
                    <p id="comfirmNote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                </div> */}

                <div className="section mb-3">
                    <label htmlFor="">Gender:</label>
                    <div className="input_status">
                        <div className="status_item">
                            <InputRadio 
                                onChange={handleCheckbox}
                                className="input_checkbox"
                                name="gender"
                                value='male'
                                checked={checkbox === 'male'}
                            />
                            <span>male</span>
                        </div>
                    </div>
                    <div className="input_status">
                        <div className="status_item">
                            <InputRadio 
                                onChange={handleCheckbox}
                                className="input_checkbox"
                                checked={checkbox === 'female'}
                                name="gender"
                                value='female'
                            />
                            <span>female</span>
                        </div>
                    </div>
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
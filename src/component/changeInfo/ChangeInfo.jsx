import React, { useState, useEffect, Fragment }  from 'react'
import { faCheck, faTimes, faInfoCircle, faIceCream, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from "sweetalert";

import './changeinfo.scss';

import Input, { InputDefault, InputRadio } from '../input/Input';
import webApi, { getType } from '../../api/webApi';
import Button from '../button/Button';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const ChangeInfomation = (props) => {
    const [email, setEmail] = useState(props.email);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState(props.phone);
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [name, setName] = useState(props.name);

    const [checkbox, setCheckbox] = useState(props.checkBox);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone]);

    const handleInput = (e) => {
        setName(e.target.value);
    }
    const handleCheckbox = (e) => {
        setCheckbox(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const data = {
                id: props.id,
                name: name,
                email: email,
                phone: phone,
                gender: checkbox

            }

            const result = await webApi.update(getType.Account, data);
            if(result.status === 200){
            swal('Success',result.message, 'success')
            }else{
                swal('Warn',result.message, 'warning')
            }
        }catch(e){}
    }
    return (
        <div className={`ChangeInfomation form-info ${props.changeInfo ? 'show' : '' }`}>
            <div className="form-header">
                Chỉnh sửa thông tin cá nhân
            </div>
            <div className="form-body">
                <div className="form-edit">
                    <form onSubmit={handleSubmit} id="form-submit">
                        <div className="section mb-3">
                            <label htmlFor="nameuser">
                                Username:
                            </label>
                            <div className="input__name">
                            <InputDefault 
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleInput}
                            />

                            </div>
                        </div>
                        <div className="section mb-3">
                            <label htmlFor="emailuser">
                                Email:
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validEmail || !email ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <div className="input__email">
                            <Input 
                                type="email"
                                id="emailuser"
                                
                                
                                placeholder= "enter your email address..."
                                value={email}
                                name="email"
                                onChange = {(e) => setEmail(e.target.value)}
                                autoComplete="off"
                                required
                                describedby="uidnote"
                                invalid={validEmail ? "false" : "true"}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false) }
                            />
                            </div>
                            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                You must enter a valid email address !
                            </p>
                        </div>

                        <div className="section mb-3">
                            <label htmlFor="phoneuser">
                                Phone number:
                                <span className={validPhone ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validPhone || !phone ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <div className="input__email">
                            <Input 
                                type="text"
                                id="phoneuser"
                                placeholder= "enter your email address..."
                                value={phone}
                                name="phone"
                                onChange = {(e) => setPhone(e.target.value)}
                                autoComplete="off"
                                required
                                describedby="uidnote"
                                invalid={validPhone ? "false" : "true"}
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false) }
                            />
                            </div>
                            <p id="uidnote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                You must enter correct phone number!<br/>
                                Must 10 number.<br/>
                                Do not have charachers, special characters.
                            </p>
                        </div>

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
                        </div>
                        <div className="section mb-3">
                            <div className="tag">
                                <Button className="small btn__primary" 
                                    disabled = {!validEmail || !validPhone  ? true : false}
                                >Update</Button>
                            </div>
                            
                        </div>
                    </form> 
                </div> 
            </div>
        </div>
    )
}



export const ChangePassword = (props) => {
    const [showEye, setShowEye] = useState({
        pass: false,
        confirm : false
    });

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [inputPass, setInputPass] = useState({
        old_password: '',
    })

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const handleShowPass = () => {
        setShowEye({...showEye, pass: !showEye.pass});
    }
    const handleShowText = () => {
        setShowEye({...showEye, confirm: !showEye.confirm})
    }



    const handleInputPass = (e) => {
        setInputPass({...inputPass, [e.target.name]: e.target.value});
    }

    const handleSubmitPassword = async (e) => {
        e.preventDefault();


        try{
            const data = {
                id: props.id,
                old_password: inputPass.old_password,
                new_password: pwd,
                password_confirmation: matchPwd
            }
            const result = await webApi.changePassword(data);
            if(result.status === 200){
                swal('Success',result.message, 'success')
                }else{
                    swal('Warn',result.message, 'warning')
                }
        }catch(e){}
    }
    return (
        <div className={`ChangeInfomation form-info ${props.changeInfo ? 'show' : '' }`}>
            <div className="form-header">
                Chỉnh sửa thông tin cá nhân
            </div>
            <div className="form-body">
                <div className="form-edit">
                    <form onSubmit={handleSubmitPassword} id="form-submit">
                        <div className="section mb-3">
                            <label htmlFor="nameuser">
                                old password:
                                <span className={inputPass.old_password !== '' ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <div className="input__name">
                            <Input 
                                type="text"
                                id="nameuser"
                                placeholder= "enter your name..."
                                value={inputPass.old_password}
                                name="old_password"
                                onChange = {handleInputPass}
                                autoComplete="off"
                                required
                                describedby="uidnote"
                                invalid={!inputPass.old_password ? "false" : "true"}
                            />
                            </div>
                            <p id="uidnote" className={inputPass.old_password === '' ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                You must enter this field.
                            </p>
                        </div>
                        <div className="section mb-3">
                        <label htmlFor="password">
                            new Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
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
                                Must match the new password input field.
                            </p>
                        </div>
                        
                        <div className="section mb-3">
                            <div className="tag">
                                <Button className="small btn__primary" 
                                    disabled = { !validPwd || !validMatch || inputPass.old_password === '' ? true : false}
                                >Update</Button>
                            </div>
                        
                        </div>
                    </form> 
                </div> 
            </div>
            
        </div>
    )
}



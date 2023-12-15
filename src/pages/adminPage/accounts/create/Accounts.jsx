import React, {useEffect, useState, useRef} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle, faIceCream, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';


import './account.scss';

import Input, {InputRadio} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';

import webApi, { getType } from '../../../../api/webApi';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const Accounts = ({list}) =>{
    const history = useHistory();
    const userRef = useRef();
    const errRef = useRef();

    
    const [showEye, setShowEye] = useState({
        pass: false,
        confirm : false
    });
    const [token, setToken] = useState({
        guest_session: '',
        exprires: ''
    })
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [checkbox, setCheckbox] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd])


    const handleShowPass = () => {
        setShowEye({...showEye, pass: !showEye.pass});
    }

    const handleShowText = () => {
        setShowEye({...showEye, confirm: !showEye.confirm})
    }

    const handleCheckbox = (e) => {
        setCheckbox(e.target.value);
    }

    const clearValue = () => {
        setEmail('');
        setPwd('');
        setUser('');
        setMatchPwd('');
        setPhone('')
        setCheckbox('');
    }
    const handleRegister = async (e) => {
        e.preventDefault();

        const validName = USER_REGEX.test(user);
        const validPass = PWD_REGEX.test(pwd);
        const validEmail = EMAIL_REGEX.test(email);
        const validPhone = PHONE_REGEX.test(phone);
        if(!validName || !validPass || !validEmail){
            setErrMsg("Invalid Enter");
            return;

        }
        try{
            const params = {
                name: user,
                email: email,
                password: pwd,
                password_confirmation: matchPwd,
                gender: checkbox,
                phone: phone
            }

            const result = await webApi.create(getType.Account ,params);

            if(result.status === 200){
                swal('Success', result.message, 'success');
            }else{
                swal('Warn', result.message, 'Warning');
            }

            
        }catch(err){
            console.log(err);
        }
        
        
    }
    return (
        <div className="Account-form">
            <form onSubmit={handleRegister}>
                <div className="section mb-3">
                    <label htmlFor="nameuser">
                        Username:
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validName || !user ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <div className="input__name">
                    <Input 
                        type="text"
                        id="nameuser"
                        
                        ref={userRef}
                        placeholder= "enter your name..."
                        value={user}
                        name="name"
                        onChange = {(e) => setUser(e.target.value)}
                        autoComplete="off"
                        required
                        describedby="uidnote"
                        invalid={validName ? "false" : "true"}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false) }
                    />
                    </div>
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 24 characters.<br/>
                        Must begin with a letter.<br/>
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
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
                    <label htmlFor="password">
                        Password:
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
                            name="comfirm_password"
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
                            />
                            <span>male</span>
                        </div>
                    </div>
                    <div className="input_status">
                        <div className="status_item">
                            <InputRadio 
                                onChange={handleCheckbox}
                                className="input_checkbox"
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
                            disabled = {!validName || !validPwd || !validMatch ? true : false}
                        >Register </Button>
                    </div>
                    
                </div>
            </form>  
        </div>

    )
}

export default Accounts;
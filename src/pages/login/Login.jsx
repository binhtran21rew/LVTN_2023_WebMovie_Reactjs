import React, {useRef, useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
import { useHistory} from 'react-router';
import axios from 'axios';
import './login.scss';

import Input from '../../component/input/Input';
import Button from '../../component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import webApi from '../../api/webApi';

const Login = () => {
    const history = useHistory();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [showEye, setShowEye] = useState(false);



    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user, password]);

    const showText = () =>{
        setShowEye(!showEye);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const params = {
                email: user,
                password: password
            }
            const result = await webApi.userLogin(params);
            if(result){
                localStorage.setItem('auth_token', result.data.token);
                // localStorage.setItem('role', result.data.roles);

                history.push('/');
            }
            setUser('');
            setPassword('');
        }catch(err){
            console.log(err);
        }


    }
    return (
        <div>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live='assertive'>{errMsg}</p>
                <div className="container">
                    <div className="login">
                        <h2>
                            <span className="login__content">
                                Đăng nhập
                            </span>
                        </h2>
                        <form onSubmit={handleSubmit} method='POST'>
                            <div className="section mb-3">
                                <label htmlFor="">
                                    <p>Email:</p>
                                </label>
                                <div className="input__user">
                                    <Input 
                                        id="Email"
                                        ref={userRef}
                                        value={user}
                                        placeholder="email address"
                                        type="email"
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="section mb-3">
                                <label htmlFor="">
                                    <p>Password:</p>
                                </label>
                                <div className="input__password">
                                    <Input 
                                        id="password"
                                        ref={userRef}
                                        value={password}
                                        placeholder="your password"
                                        type={showEye ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    {showEye ? <FontAwesomeIcon icon={faEye} onClick={showText} className='input__password__display'/> : 
                                    
                                    <FontAwesomeIcon icon={faEyeSlash} onClick={showText} className='input__password__display'/>}
                                    
                                    

                                </div>
                                
                            </div>
                            <div className="section mb-3">
                                <div className="tag">
                                    <Button className="small btn__primary" 
                                    >Login </Button>
                                    <span className="link">
                                        <Link to='/register'>Sign up</Link>
                                    </span>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
            
            </section>
        </div>
    )
}

export default Login;
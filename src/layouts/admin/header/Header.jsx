import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './admin-header.scss';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faInfo, faUser} from '@fortawesome/free-solid-svg-icons';
import webApi from '../../../api/webApi';
import Button from '../../../component/button/Button';

import {InputDefault as Input} from '../../../component/input/Input';
const Header = () => {

    const [user, setUser] = useState([]);
    const token = localStorage.getItem('auth_token');
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const user = async () => {
            const response = await webApi.getUser();

            setUser(response);
        }

        user();

    }, [token]);
    

    const dropdown = () => {
        setToggle(!toggle);
    }
    useEffect(() => {
        const bars = document.querySelector('.cover-sidebar__fabar');
        const header_sidebar = document.querySelector('.cover-sidebar');
        const sidebar = document.querySelector('.Admin-sidebar');
        const show = () => {
            sidebar.classList.toggle('close');

            header_sidebar.classList.toggle('close');
        }
        bars.addEventListener('click', show);

        return () => {
            bars.removeEventListener('click', show);

        }
    }, []);
    const handleLogout = async () => {
        try{
            const logout = await webApi.logout();
            if(logout.status === 200){
                localStorage.removeItem('auth_token');

                window.location.reload();
            }
        }catch(e){
            
        }

    }

    return (

        <div className="Admin-header">
            <div className="cover-sidebar">
                <div className="cover-sidebar__fabar">
                    <FontAwesomeIcon icon={faBars}/>
                </div>
                <span className="cover-sidebar__text">
                    <Link to='/admin'> 
                        MovieAdmin
                    </Link>
                </span>
            </div>
            <div className="content__admin">
                Welcom back: <span className='user-name'>{user.name}</span>
                <div className="infomation">
                    <div className="search user">
                    </div>
                    <div className="user">
                        <FontAwesomeIcon icon={faUser} onClick={dropdown}/>

                        <div className={`dropdown ${toggle ? 'show' : ''}`}>
                            <div className="dropdown__header_content">
                                <div className="header__text">
                                    {user.name}
                                </div>
                                <span className='header_email'>
                                    {user.email}
                                </span>
                            </div>
                            <div className="dropdown__profile">
                                <ul>
                                    <li>
                                        <Link to={'/admin/profile/user'}> 
                                            <div className="dropdown__profile-icon">
                                            <FontAwesomeIcon icon={faInfo}/>
                                            </div>
                                            <span className='dropdown__profile-text'>
                                                My Profile
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Button className='dropdown__profile-btn' onClick={handleLogout}>Logout</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Header;
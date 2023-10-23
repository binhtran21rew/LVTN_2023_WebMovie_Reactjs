import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './admin-header.scss';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faInfo, faUser} from '@fortawesome/free-solid-svg-icons';
import webApi from '../../../api/webApi';

import {InputDefault as Input} from '../../../component/input/Input';
const Header = () => {

    const options = [
        {
            display: 'My Profile',
            path:'/admin/profile/user',
            icon: faInfo
        },
        {
            display: 'Log Out',
            path:'/api/logout',
            icon: faArrowRightFromBracket,
        }

    ]


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
            <div className="content">
                Welcom back: <span className='user-name'>{user.name}</span>
                <div className="infomation">
                    <div className="search user">
                        <Input />
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
                                        {
                                            options.map((item, i) => (
                                            <li key={i}>
                                                <Link to={item.path ? item.path : '/'}> 
                                                    <div className="dropdown__profile-icon">
                                                        <FontAwesomeIcon icon={item.icon}/>
                                                    </div>
                                                    <span className='dropdown__profile-text'>
                                                        {item.display}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))
                                        }
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
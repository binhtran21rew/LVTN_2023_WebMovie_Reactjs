import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './admin-sidebar.scss';
import {contentSidebarAdmin} from '../../../component/content/Content';
const Sitebar = () => {
    

    const {pathname} = useLocation();
    const active = contentSidebarAdmin.findIndex(e => e.path === pathname);

    useEffect(() => {
        const body = document.querySelector('body');
        const modeSwitch = document.querySelector('.toggle-switch');
        const mode =  () => {
            body.classList.toggle('dark');
        }
        modeSwitch.addEventListener('click', mode)

        return () => {
            modeSwitch.removeEventListener('click', mode)
        }
    }, []);
    return (

        <div className="Admin-sidebar">
            <div className="menu">
                <ul>
                    {
                        contentSidebarAdmin.map((item, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className='text'>{item.display}</span>
                                
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="bottom-content">
                <li className='mode'>
                    <div className="moon-sun">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className='mode-text'>Dark Mode </span>
                    <div className="toggle-switch">
                        <span className='switch'></span>
                    </div>
                </li>
            </div>

           
        </div>
    )
}

export default Sitebar;

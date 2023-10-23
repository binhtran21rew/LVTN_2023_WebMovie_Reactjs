import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './admin-sidebar.scss';

const Sitebar = () => {

    const contents = [
        {
            'display': 'Movies',
            'path' : '/admin/movies/list_movie',
            'icon' : 'movie'
        },
        {
            'display': 'Trailers',
            'path' : '/admin/trailers/list_trailer',
            'icon' : 'movie-play'
        },
        {
            'display': 'Casts',
            'path' : '/admin/casts/list_cast',
            'icon' : 'user'

        },
        {
            'display': 'Rooms',
            'path' : '/admin/rooms/list_room',
            'icon' : 'tv'
        },
        {
            'display': 'Bookings',
            'path' : '/admin/bookings/list_booking',
            'icon' : 'calendar'
        },
        {
            'display': 'Accounts',
            'path' : '/admin/accounts/list_user_account',
            'icon' : 'group'
        },
    ]

    const {pathname} = useLocation();
    const active = contents.findIndex(e => e.path === pathname);

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
                        contents.map((item, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={item.path}>
                                    <i className={`bx bx-${item.icon}`}></i>
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

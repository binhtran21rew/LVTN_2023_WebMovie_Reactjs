import React, {useEffect, useRef} from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import logo from '../../../assets/logo/tmovie.png';
import './header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTicket } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../component/button/Button';
import webApi from '../../../api/webApi';
import {optionUser as option, optionWeb as headerNav} from '../../../component/content/Content';
import SideBar from '../../../component/sideBar/SideBar';
import Search from '../../../component/client/search/Search';
import TiketOnline from '../../../component/client/cardContent/TiketOnline';
const Header = () => {
    
    const history = useHistory();
    const {pathname} = useLocation();
    const headerRef = useRef(null);
    const barRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                headerRef.current.classList.add('shrink');
            }else{
                headerRef.current.classList.remove('shrink');
            }
        }

        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        }
    }, []);

    const handleLogout = async () => {
        try{
            const logout = await webApi.logout();
            if(logout.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('role');
    
                history.push('/');
            }
        }catch(e){
            console.log(e);
        }

    }
    
    const toggle = () => {
        const isHide = barRef.current.style.display === 'block'
        if(isHide){
            barRef.current.style.display ='none'
        }else{
            barRef.current.style.display ='block';

        }
    }

    const isDesktop = useMediaQuery('(min-width:1141px');
    return (
        <>
            <div ref={headerRef} className="header">
                <div className="header__warp container">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to='/'>Movies</Link>
                    </div>

                    
                    <div className="header-search">
                        {isDesktop ? <Search/> : ''}
                    </div>
                    <div className="header__nav">
                        <div className="nav">
                            <ul>
                                {
                                    headerNav.map((e,i) => (
                                        <li key={i} className= {`${i === active ? 'active' : ''}`}>
                                            <Link to={e.path ? e.path : '/'}>
                                                <div className="header__nav--icon">
                                                    {
                                                        e.icon ? <FontAwesomeIcon icon={e.icon}/> : ''
                                                    }
                                                </div>
                                                <span>
                                                    {e.display}
                                                </span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            
                                {
                                    localStorage.getItem('auth_token') ? 
                                    <li>

                                        <Button onClick={handleLogout}>Logout</Button>
                                    </li>
                                    :
                                    <div className="option">
                                    {option.map((e,i) => (
                                            <li key={i} className= {`${i === active ? 'active' : ''}`}>
                                                <Link to={e.path}>
                                                    <span>
                                                        {e.display}

                                                    </span>
                                                </Link>
                                            </li>
                                    ))}
                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                <div className="bars showBar">
                        <FontAwesomeIcon icon={faBars} className='showBar' onClick={toggle}/>
                    </div>
                </div>

                {isDesktop ? '' : <SideBar option={option} headerNav={headerNav} ref={barRef}/>}
            

            </div>

            <TiketOnline />
        </>
        

    )
}

export default Header;
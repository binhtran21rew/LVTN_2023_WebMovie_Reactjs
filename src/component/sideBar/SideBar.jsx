import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo/tmovie.png';
import Button from '../../component/button/Button';
import webApi from '../../api/webApi';
import Search from '../client/search/Search';



const SideBar = React.forwardRef((props,ref) => {
    const history = useHistory();
    const handleLogout = async () => {
        const logout = await webApi.logout();
        if(logout.status === 200){
            localStorage.removeItem('auth_token');
            localStorage.removeItem('role');

            history.push('/');
        }
    }

    const isDesktop = useMediaQuery('(min-width:1141px');

    return (
        <div ref={ref} className="sideBar toggleShow">
            <div className="nav__search">
                <Search />
            </div>
            
            <header>
                <a href="/" className="link-home"/>
            </header>
            <ul>
                <div className="nav__header">
                    {/* {
                        localStorage.getItem('auth_token') ? 
                        <li>
                            <Link to='/customer/account'>
                                <div className="header__nav-option--icon">
                                </div>
                                    Thông tin
    
                            </Link>
                        </li> : ''
                    } */}
                    
                {
                    
                    props.headerNav.map((e,i) => (
                        <li key={i}>
                            <Link to={ e.path ? e.path : '/'}>
                                
                                {e.display}
                            </Link>
                        </li>
                    ))
                }
                </div>
                
                {
                    localStorage.getItem('auth_token') ? 
                    
                        <Button onClick={handleLogout}>Logout</Button>
                    
                    :
                    props.option.map((e,i) => (
                        <li key={i}>
                            <Link to={e.path}>
                                <div className="header__nav-option--icon">
                                    {
                                        e.icon ? <FontAwesomeIcon icon={e.icon}/> : ''
                                    }
                                </div>
                                    {e.display}

                            </Link>
                        </li>
                    ))
                }
            
                

            </ul>
        </div>
    )

})




export default SideBar;

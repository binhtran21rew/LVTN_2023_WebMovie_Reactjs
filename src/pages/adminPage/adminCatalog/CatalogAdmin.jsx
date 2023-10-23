import React from 'react';
import { useParams } from 'react-router-dom';
 
import Movies from '../../../component/admin/movies/Movies';
import Trailers from '../../../component/admin/trailers/Trailers';
import Casts from '../../../component/admin/casts/Casts';
import Rooms from '../../../component/admin/rooms/Rooms';
import Bookings from '../../../component/admin/bookings/Bookings';
import Accounts from '../../../component/admin/accounts/Accounts';
import Profile from '../../../component/admin/profile/Profile';

import './catalog-admin.scss';
const CatalogAdmin = () => {
    const {name, list} = useParams();

    const renderPage = (name) => {
        switch (name) {
            case 'movies':
                return(
                    <Movies list={list}/>
                )
            case 'trailers':
                return(
                    <Trailers list={list}/>
                )
            case 'casts':
                return(
                    <Casts list={list}/>
                )
            case 'rooms':
                return(
                    <Rooms list={list}/>
                )
            case 'bookings':
                return(
                    <Bookings list={list}/>
                )
            case 'accounts':
                return(
                    <Accounts list={list}/>
                )
            case 'profile':
                return (
                    <Profile />
                )
        }
    }
    return (
        <div className='Admin-catalog'>
            <div className="Catalog">
                <div className="Catalog__header">
                    {name}
                </div>
                <div className="Catalog__body">
                    {renderPage(name)}
                </div>
            </div>
        </div>
    )
}

export default CatalogAdmin;
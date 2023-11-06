import React from 'react';
import {Link, useParams } from 'react-router-dom';


import Movies from '../movies/Movies';
import Trailers from '../trailers/Trailers';
import Casts from '../casts/Casts';
import Genres from '../genres/Genres';
import Rooms from '../rooms/Rooms';
import Bookings from '../bookings/Bookings';
import Accounts from '../accounts/Accounts';
import Profile from '../profile/Profile';
import Schedules from '../schedules/Schedules';

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
            case 'genres':
                return(
                    <Genres list={list}/>
                )
            case 'casts':
                return(
                    <Casts list={list}/>
                )
            case 'rooms':
                return(
                    <Rooms list={list}/>
                )
            case 'schedules':
                return(
                    <Schedules list={list}/>
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
                    <span>{name}</span>

                    <div className='LinkTo'>
                        <Link to={`/admin/${list}/${name}`}>go to {list} </Link>
                    </div>
                    
                    
                </div>
                <div className="Catalog__body">
                    {renderPage(name)}
                </div>
            </div>
        </div>
    )
}

export default CatalogAdmin;
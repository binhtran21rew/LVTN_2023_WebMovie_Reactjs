import React from 'react';

import Movies from '../../pages/adminPage/movies/create/Movies';
import Trailers from '../../pages/adminPage/trailers/create/Trailers';
import Casts from '../../pages/adminPage/casts/create/Casts';
import Genres from '../../pages/adminPage/genres/create/Genres';
import Rooms from '../../pages/adminPage/rooms/create/Rooms';
import Bookings from '../../pages/adminPage/bookings/Bookings';
import Accounts from '../../pages/adminPage/accounts/create/Accounts';
import Profile from '../../pages/adminPage/profile/Profile';
import Schedules from '../../pages/adminPage/schedules/create/Schedules';


import ListMovies from '../../pages/adminPage/movies/list/ListMovies';
import ListTrailers from '../../pages/adminPage/trailers/list/ListTrailers';
import ListCast from '../../pages/adminPage/casts/list/ListCast';
import ListGenres from '../../pages/adminPage/genres/list/ListGenres';
import ListRoom from '../../pages/adminPage/rooms/list/ListRoom';
import ListSchedule from '../../pages/adminPage/schedules/list/ListSchedule';


import EditMovie from '../../pages/adminPage/movies/edit/EditMovie';
import EditTrailer from '../../pages/adminPage/trailers/edit/EditTrailer';
import EditCast from '../../pages/adminPage/casts/edit/EditCast';
import EditGenres from '../../pages/adminPage/genres/edit/EditGenres';
import EditRoom from '../../pages/adminPage/rooms/edit/EditRoom';
const RenderPage = ({...props}) => {
    switch (props.page) {
        case 'movies':
            return(
                <Movies/>
            )
        case 'trailers':
            return(
                <Trailers/>
            )
        case 'genres':
            return(
                <Genres/>
            )
        case 'casts':
            return(
                <Casts/>
            )
        case 'rooms':
            return(
                <Rooms/>
            )
        case 'schedules':
            return(
                <Schedules/>
            )
        case 'bookings':
            return(
                <Bookings/>
            )
        case 'accounts':
            return(
                <Accounts/>
            )
        case 'profile':
            return (
                <Profile />
            )
        case 'list_movie':
            return(
                <ListMovies />
            )
        case 'list_trailer':
            return(
                <ListTrailers />
            )
        case 'list_cast':
            return(
                <ListCast />
            )
        case 'list_genre':
            return(
                <ListGenres/>
            )
        case 'list_room':
            return(
                <ListRoom/>
            )
        case 'list_schedule':
            return(
                <ListSchedule/>
            )
        case 'detail_movie':
            return(
                <EditMovie />
            )
        case 'detail_trailer':
            return(
                <EditTrailer />
            )
        case 'detail_cast':
            return(
                <EditCast />
            )
        case 'detail_genre':
            return(
                <EditGenres />
            )
        case 'detail_room':
            return(
                <EditRoom />
            )
    }
}

export default RenderPage;
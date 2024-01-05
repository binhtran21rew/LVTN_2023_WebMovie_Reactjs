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
import Food from '../../pages/adminPage/food/create/Food';

import ListMovies from '../../pages/adminPage/movies/list/ListMovies';
import ListTrailers from '../../pages/adminPage/trailers/list/ListTrailers';
import ListCast from '../../pages/adminPage/casts/list/ListCast';
import ListGenres from '../../pages/adminPage/genres/list/ListGenres';
import ListRoom from '../../pages/adminPage/rooms/list/ListRoom';
import ListFood from '../../pages/adminPage/food/list/ListFood';
import ListAccount from '../../pages/adminPage/accounts/list/ListAccount';

import EditMovie from '../../pages/adminPage/movies/edit/EditMovie';
import EditTrailer from '../../pages/adminPage/trailers/edit/EditTrailer';
import EditCast from '../../pages/adminPage/casts/edit/EditCast';
import EditGenres from '../../pages/adminPage/genres/edit/EditGenres';
import EditRoom from '../../pages/adminPage/rooms/edit/EditRoom';
import EditFood from '../../pages/adminPage/food/edit/EditFood';
import EditRole from '../../pages/adminPage/accounts/role/edit/EditRole';


import GarbageTrailer from '../../pages/adminPage/trailers/garbage/GarbageTrailer';
import GarbageCast from '../../pages/adminPage/casts/garbage/GarbageCast';
import GarbageMovie from '../../pages/adminPage/movies/garbage/GarbageMovie';
import GarbageGenre from '../../pages/adminPage/genres/garbage/GarbageGenre';
import GarbageRoom from '../../pages/adminPage/rooms/garbage/GarbageRoom';

import SearchMovie from '../../pages/adminPage/movies/search/SearchMovie';
import SearchTrailer from '../../pages/adminPage/trailers/search/SearchTrailer';
import SearchCast from '../../pages/adminPage/casts/search/SearchCast';
import SearchGenre from '../../pages/adminPage/genres/search/SearchGenre';
import SearchRoom from '../../pages/adminPage/rooms/search/SearchRoom';
import SearchFood from '../../pages/adminPage/food/search/SearchFood';
import SearchAccount from '../../pages/adminPage/accounts/search/SearchAccount';
import SearchBooking from '../../pages/adminPage/bookings/search/SearchBooking';
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
                <Bookings />
            )
        case 'accounts':
            return(
                <Accounts/>
            )
        case 'profile':
            return (
                <Profile />
            )
        case 'foods':
            return (
                <Food/>
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
        case 'list_food':
            return(
                <ListFood />
            )
        case 'list_account':
            return(
                <ListAccount />
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
        case 'detail_food':
            return(
                <EditFood />
            )
        case 'detail_role':
            return(
                <EditRole />
            )
        case 'trailer_Trashed':
            return(
                <GarbageTrailer />
            )
        case 'cast_Trashed':
            return(
                <GarbageCast />
            )
        case 'movie_Trashed':
            return(
                <GarbageMovie />
            )
        case 'genre_Trashed':
            return(
                <GarbageGenre />
            )
        case 'room_Trashed':
            return(
                <GarbageRoom />
            )
        case 'search_movie':
            return(
                <SearchMovie />
            )
        case 'search_trailer':
            return(
                <SearchTrailer />
            )
        case 'search_cast':
            return(
                <SearchCast />
            )
        case 'search_genre':
            return(
                <SearchGenre />
            )
        case 'search_room':
            return(
                <SearchRoom />
            )
        case 'search_food':
            return(
                <SearchFood />
            )
        case 'search_account':
            return(
                <SearchAccount />
            )
        case 'search_booking': 
            return(
                <SearchBooking />
            )
    }
}

export default RenderPage;
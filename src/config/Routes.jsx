import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/userPage/home/Home';
import Catalog from '../pages/userPage/catalog/Catalog';
import Detail from '../pages/userPage/detail/Detail';
import BookingTicket from '../pages/userPage/bookingTicket/BookingTicket';


// import Header from '../layouts/admin/header/Header';
import HomeAdmin from '../pages/adminPage/home/HomeAdmin'
import CatalogAdmin from '../pages/adminPage/adminCatalog/CatalogAdmin';
import CatalogDetailAdmin from '../pages/adminPage/adminDetailCatalog/CatalogDetailAdmin';
const publicClientRoute = [
    {path: '/', exact: true, component: Home, name: 'Home'},
    {path: '/movie/search/:keyword', exact: true, component: Catalog, name: 'Catalog'},
    {path: '/movie/chitiet/:id', exact: true, component: Detail, name: 'Detail'},
    {path: '/booking/:schedule', exact: true, component: BookingTicket, name: 'Book'}
]


export const adminRoutes = [
    { path: '/admin', exact: true, component: HomeAdmin, name: 'Admin'},
    { path: "/admin/home",  exact: true,  component: HomeAdmin, name: 'adminHome'},
    { path: "/admin/:name/:list",  exact: true,  component: CatalogAdmin, name: 'adminCatalog'},
    { path: "/admin/detail/:name/:id", exact: true, component: CatalogDetailAdmin, name: 'adminCatelogDetail'}
]


export default publicClientRoute;




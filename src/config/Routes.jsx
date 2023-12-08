import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/userPage/home/Home';
import Catalog from '../pages/userPage/catalog/Catalog';
import Detail from '../pages/userPage/detail/Detail';
import BookingTicket from '../pages/userPage/bookingTicket/BookingTicket';
import Account from '../pages/userPage/customer/Account';
import BookingMovie from '../pages/userPage/bookingMovie/bookingMovie';



// import Header from '../layouts/admin/header/Header';
import HomeAdmin from '../pages/adminPage/home/HomeAdmin'
import CatalogAdmin from '../pages/adminPage/adminCatalog/CatalogAdmin';
import CatalogDetailAdmin from '../pages/adminPage/adminDetailCatalog/CatalogDetailAdmin';
import CheckOut from '../pages/userPage/checkout/CheckOut';
import OrderSuccess from '../pages/userPage/orderSuccess/OrderSuccess';
const publicClientRoute = [
    {path: '/', exact: true, component: Home, name: 'Home'},
    {path: '/movie/search/:keyword', exact: true, component: Catalog, name: 'Catalog'},
    {path: '/movie/chitiet/:id', exact: true, component: Detail, name: 'Detail'},
    {path: '/booking/:schedule', exact: true, component: BookingTicket, name: 'Book'},
    {path: '/checkout', exact: true, component: CheckOut, name: 'Book'},
    {path: '/customer/account', exact: true, component: Account, name: 'account'},
    {path: '/lichchieu/:idMovie', exact: true, component: BookingMovie, name: 'lichchieu'},
    {path: '/order/success', exact: true, component: OrderSuccess, name: 'orderSuccess'},
]


export const adminRoutes = [
    { path: '/admin', exact: true, component: HomeAdmin, name: 'Admin'},
    { path: "/admin/home",  exact: true,  component: HomeAdmin, name: 'adminHome'},
    { path: "/admin/:name/:list",  exact: true,  component: CatalogAdmin, name: 'adminCatalog'},
    { path: "/admin/detail/:name/:id", exact: true, component: CatalogDetailAdmin, name: 'adminCatelogDetail'}
]


export default publicClientRoute;




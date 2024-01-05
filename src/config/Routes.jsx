import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/userPage/home/Home';
import Catalog from '../pages/userPage/catalog/Catalog';
import Detail from '../pages/userPage/detail/Detail';
import BookingTicket from '../pages/userPage/bookingTicket/BookingTicket';
import Account from '../pages/userPage/customer/Account';
import BookingMovie from '../pages/userPage/bookingMovie/bookingMovie';
import AccountPermission from '../pages/adminPage/accounts/permission/AccountPermission';
import RoleAccount from '../pages/adminPage/accounts/role/RoleAccount';
import CreateRole from '../pages/adminPage/accounts/role/create/CreateRole';


// import Header from '../layouts/admin/header/Header';
import HomeAdmin from '../pages/adminPage/home/HomeAdmin'
import CatalogAdmin from '../pages/adminPage/adminCatalog/CatalogAdmin';
import CatalogDetailAdmin from '../pages/adminPage/adminDetailCatalog/CatalogDetailAdmin';
import CheckOut from '../pages/userPage/checkout/CheckOut';
import OrderSuccess from '../pages/userPage/orderSuccess/OrderSuccess';
import TypeFood from '../pages/adminPage/food/create/TypeFood';
import EditAccount from '../pages/adminPage/accounts/edit/EditAccount';
import CatalogSearch from '../pages/adminPage/CatalogSearch/PageSeach';
import ChartData from '../pages/adminPage/bookings/chart/ChartData';

const publicClientRoute = [
    {path: '/', exact: true, component: Home, name: 'Home'},



    {path: '/phimdangchieu', exact: true, component: Catalog, name: 'Catalog'},

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
    { path: "/admin/search/",  exact: true,  component: CatalogSearch, name: 'pageSeach'},
    { path: "/admin/list_booking/statistics",  exact: true,  component: ChartData, name: 'statisticsBooking'},


    { path: "/admin/account/permisson/:id",  exact: true,  component: EditAccount, name: 'adminPermission'},
    { path: "/admin/role",  exact: true,  component: RoleAccount, name: 'adminRoleAccount'},
    { path: "/admin/create/role",  exact: true,  component: CreateRole, name: 'adminRoleAccount'},
    { path: "/admin/combo_foods",  exact: true,  component: TypeFood, name: 'adminFood'},
    
    
    { path: "/admin/:name/:list",  exact: true,  component: CatalogAdmin, name: 'adminCatalog'},
    { path: "/admin/detail/:name/:id", exact: true, component: CatalogDetailAdmin, name: 'adminCatelogDetail'}
]


export default publicClientRoute;




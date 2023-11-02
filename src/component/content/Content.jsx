import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTicket } from '@fortawesome/free-solid-svg-icons';



export const optionWeb =[
    localStorage.getItem('auth_token') ? {
        display: 'Thông tin',
        path:'/customer/account',
        icon: faTicket
    } : '',
    {
        display: 'Phim',
        path: '/phimdangchieu'
    },
    {
        display: 'Lịch Chiếu',
        path: '/lichchieu'
    },

]
    
export const optionUser = [
    {
        display: 'Login',
        path: '/login'
    },
    {
        display: 'Register',
        path: '/register'
    }
]

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTicket} from '@fortawesome/free-solid-svg-icons';



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


export const contentSidebarAdmin = [
  {
      'display': 'Movies',
      'path' : '/admin/movies/list_movie',
      'icon' : 
          <svg width="1em" height="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="#000000" d="M136 488h359.985V24H16v464h120ZM408 56h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408ZM136 200V56h239.985v184H136Zm0 216V272h239.985v184H136ZM48 56h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Z"></path>
          </svg>
        
  },
  {
      'display': 'Trailers',
      'path' : '/admin/trailers/list_trailer',
      'icon' : <svg width="1em" height="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000000" d="M136 488h359.985V24H16v464h120ZM408 56h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408Zm0 72h55.985v40H408ZM136 200V56h239.985v184H136Zm0 216V272h239.985v184H136ZM48 56h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Zm0 72h56v40H48Z"></path>
      </svg>
  },
  {
      'display': 'Casts',
      'path' : '/admin/casts/list_cast',
      'icon' : <svg width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" >
      <path fill="#000000" d="M746 835.28L544.529 723.678c74.88-58.912 95.216-174.688 95.216-239.601v-135.12c0-89.472-118.88-189.12-238.288-189.12c-119.376 0-241.408 99.664-241.408 189.12v135.12c0 59.024 24.975 178.433 100.624 239.089L54 835.278S0 859.342 0 889.342v81.088c0 29.84 24.223 54.064 54 54.064h692c29.807 0 54.031-24.224 54.031-54.064v-81.087c0-31.808-54.032-54.064-54.032-54.064zm-9.967 125.215H64.002V903.28c4.592-3.343 11.008-7.216 16.064-9.536c1.503-.688 3.007-1.408 4.431-2.224l206.688-112.096c18.848-10.224 31.344-29.184 33.248-50.528s-7.008-42.256-23.712-55.664c-53.664-43.024-76.656-138.32-76.656-189.152V348.96c0-45.968 86.656-125.12 177.408-125.12c92.432 0 174.288 78.065 174.288 125.12v135.12c0 50.128-15.568 145.84-70.784 189.28a64.098 64.098 0 0 0-24.224 55.664a64.104 64.104 0 0 0 33.12 50.849l201.472 111.6c1.777.975 4.033 2.031 5.905 2.848c4.72 2 10.527 5.343 14.783 8.288v57.887zM969.97 675.936L765.505 564.335c74.88-58.912 98.224-174.688 98.224-239.601v-135.12c0-89.472-121.872-190.128-241.28-190.128c-77.6 0-156.943 42.192-203.12 96.225c26.337 1.631 55.377 1.664 80.465 9.664c33.711-26.256 76.368-41.872 122.656-41.872c92.431 0 177.278 79.055 177.278 126.128v135.12c0 50.127-18.56 145.84-73.775 189.28a64.098 64.098 0 0 0-24.224 55.664a64.104 64.104 0 0 0 33.12 50.848l204.465 111.6c1.776.976 4.032 2.032 5.904 2.848c4.72 2 10.527 5.344 14.783 8.288v56.912H830.817c19.504 14.72 25.408 35.776 32.977 64h106.192c29.807 0 54.03-24.224 54.03-54.064V730.03c-.015-31.84-54.047-54.096-54.047-54.096z"></path>
  </svg>

  },
  {
      'display': 'Genres',
      'path' : '/admin/genres/list_genre',
      'icon' : <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000000" fillRule="evenodd" d="M2.25 6A.75.75 0 0 1 3 5.25h17a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6Zm17.216 4.016l.068.04c.792.457 1.434.827 1.906 1.163c.476.34.888.716 1.1 1.229a2.75 2.75 0 0 1 0 2.104c-.212.513-.624.89-1.1 1.229c-.473.336-1.114.706-1.906 1.163l-.068.04c-.792.457-1.433.827-1.96 1.068c-.532.243-1.065.412-1.615.34a2.75 2.75 0 0 1-1.823-1.053c-.338-.44-.457-.986-.513-1.567c-.055-.578-.055-1.318-.055-2.232v-.08c0-.914 0-1.655.055-2.232c.056-.581.175-1.127.513-1.567a2.75 2.75 0 0 1 1.823-1.053c.55-.072 1.083.097 1.614.34c.528.24 1.169.61 1.96 1.068Zm-2.584.296c-.458-.209-.672-.233-.795-.216a1.25 1.25 0 0 0-.829.478c-.075.098-.162.296-.21.797c-.047.497-.048 1.166-.048 2.129c0 .963 0 1.632.048 2.13c.048.5.135.698.21.796c.202.263.5.435.829.478c.123.017.337-.007.795-.216c.454-.208 1.034-.541 1.868-1.023c.834-.482 1.413-.817 1.82-1.106c.41-.292.537-.466.585-.58a1.25 1.25 0 0 0 0-.957c-.048-.115-.175-.289-.585-.58c-.407-.29-.986-.625-1.82-1.107c-.834-.482-1.414-.815-1.868-1.023ZM2.25 11a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm0 5a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z" clipRule="evenodd"></path>
  </svg>

  },
  {
      'display': 'Rooms',
      'path' : '/admin/rooms/list_room',
      'icon' :  <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
      <g fill="none" stroke="#000000" strokeWidth="1.5">
          <path d="M6.886 18h9.647c.617 0 .926 0 1.202-.039c1.126-.158 2.1-.785 2.624-1.69c.129-.222.226-.483.421-1.006l1.12-3C22.315 11.15 21.387 10 20.073 10c-.81 0-1.534.453-1.81 1.134l-1 2.466c-.195.478-.292.717-.476.883c-.1.091-.219.165-.349.219c-.238.098-.522.098-1.091.098h-6.98c-.293 0-.44 0-.57-.027a1.2 1.2 0 0 1-.74-.463c-.072-.1-.122-.224-.222-.47l-1.098-2.706c-.276-.68-1-1.134-1.81-1.134c-1.314 0-2.242 1.15-1.827 2.264l1.303 3.493l.039.102c.497 1.265 1.823 2.12 3.323 2.14l.121.001Z"></path>
          <path d="M6 12V8.571c0-2.155 0-3.232.703-3.902C7.406 4 8.537 4 10.8 4h2.4c2.263 0 3.394 0 4.097.67c.703.668.703 1.745.703 3.9V12"></path>
          <path strokeLinecap="round" d="M18 20v-2M6 20v-1.333"></path>
      </g>
  </svg>
  },
  {
      'display': 'Foods',
      'path' : '/admin/foods/list_food',
      'icon' : <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
      <path fill="#000000" d="M18.06 23h1.66c.84 0 1.53-.65 1.63-1.47L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26c1.44 1.42 2.43 2.89 2.43 5.29V23M1 22v-1h15.03v1c0 .54-.45 1-1.03 1H2c-.55 0-1-.46-1-1m15.03-7C16.03 7 1 7 1 15h15.03M1 17h15v2H1v-2Z"></path>
  </svg>
  },
  {
      'display': 'Schedules',
      'path' : '/admin/schedules/list_schedule',
      'icon' :   <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000000" d="M12 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm-5 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1ZM7 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1ZM19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM7 18a1 1 0 1 0-1-1a1 1 0 0 0 1 1Z"></path>
  </svg>
  },
  {
      'display': 'Bookings',
      'path' : '/admin/bookings/list_booking',
      'icon' : <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"></path>
  </svg>
  },
  {
      'display': 'Accounts',
      'path' : '/admin/accounts/list_account',
      'icon' : <svg width="1.13em" height="1em" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000000" d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6c-10.8 0-18.7 8-44.8 8c-26.9 0-33.4-8-44.8-8c-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z"></path>
  </svg>
  },

  
]

export const paymentOption = [
  {
      id: 0,
      display: 'thanh toán qua ví momo',
      value: 'momo'
  },
  {
      id: 1,
      display: 'vnPay',
      value: 'vnpay'
  },
  {
    id: 2,
    display: 'thanh toán trực tiếp',
    value: 'TT'
},
]

export const optionsSearchMovie = [
  {
    label: 'Movie',
    options: [
      {
        label: 'Title',
        value: 'title',
      },

    ],
  },
  {
    label: 'Status',
    options: [
      {
        label: '1 (now playing)',
        value: '1',
      },
      {
          label: '0 (upcoming)',
          value: '0',
        },
    ],
  },
  {
      label: 'Schedule',
      options: [
        {
          label: 'Đã lên lịch',
          value: 'setup',
        },
        {
            label: 'Chưa lên lịch',
            value: 'unSetup',
          },
      ],
    },
]

export const optionSearchFood = [
  {
    label: 'Name Food',
    options: [
      {
        label: 'Name',
        value: 'name',
      },
    ],
  },
  {
    label: 'With combo',
    options: [
      {
        label: 'Combo',
        value: 'ombo',
      },
    ],
  },
]


export const optionSearchAccount = [
  {
    label: 'Type Account',
    options: [
      {
        label: 'User',
        value: 'user',
      },
      {
        label: 'Admin',
        value: 'admin',
      },
    ],
  },
]

export const optionSearchBooking = [
  {
    label: 'Đã thanh toán',
    value: 'payment',
  },      
  {
    label: 'Chưa thanh toán',
    value: 'tt',
  },
]
export const optionChart = [
  {
    label: 'With Movie',
    value: 'movie',
  },      
  {
    label: 'With Total Price',
    value: 'total_price',
  },
  {
    label: 'With Room',
    value: 'room',
  },
]

export const optionChartWithTime = [
  {
    label: 'All Time',
    value: 'all',
  },      
  {
    label: 'Current Day',
    value: 'day',
  },
  {
    label: 'Current Month',
    value: 'month',
  },
  {
    label: 'Current Year',
    value: 'year',
  },
  {
    label: 'Input Time',
    value: 'input',
  },
]



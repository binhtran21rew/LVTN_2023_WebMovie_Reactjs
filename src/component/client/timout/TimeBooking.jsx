import React, { useState, useEffect } from 'react'


const TimeBooking = () => {
    const [timeCountDown, setTimeCountDown] = useState(600);
    const minutes = Math.floor(timeCountDown / 60).toString().padStart(2, '0');
    const second = Math.floor(timeCountDown % 60).toString().padStart(2, '0');
    useEffect(() => {
      const timer = setTimeout(() =>{
        setTimeCountDown(timeCountDown -1);
  
      }, 1000);
      if(timeCountDown === 0) {
        setTimeout(() => {
          window.location.reload();
        },3000)
      }
    }, [timeCountDown]);
    return (
        <div className="booking-time">
            <span className='title'>Thời gian giữ ghế</span>
            <span> {minutes >= 0 ? minutes : '00'} : {second >= 0 ? second : '00'}</span>
        </div>
    )
}

export default TimeBooking
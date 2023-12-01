import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import './bookingTicket.scss';

import PickTicket from '../../../component/client/booking/PickTicket';
import webApi from '../../../api/webApi';
const BookingTicket = () => {
  const {schedule} = useParams();
  const [scheduleTicket, setScheduleTicket] = useState([]);
  const [countTicket, setCountTicket] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listBookingSeat, setListBookingSeat] = useState([]);

  const [timeCountDown, setTimeCountDown] = useState(600);
  const minutes = Math.floor(timeCountDown / 60).toString().padStart(2, '0');
  const second = Math.floor(timeCountDown % 60).toString().padStart(2, '0');
  // useEffect(() => {
  //   const timer = setTimeout(() =>{
  //     setTimeCountDown(timeCountDown -1);

  //   }, 1000);
  //   if(timeCountDown === 0) {
  //     setTimeout(() => {
  //       window.location.reload();
  //     },3000)
  //   }
  // }, [timeCountDown]);
  useEffect(() => {
    const getTicket = async () =>{
      const result = await webApi.getTicketSchedule(schedule);
      setScheduleTicket(result.data)
    } 
    getTicket();
  }, [schedule]);

  const renderSeat = listBookingSeat.map((data, i) => {
    return (
      <span>{data}</span>
    )
  })
  
  return (
    <div className="booking-page">
      <div className="booking-title">
        <div className="booking-overview">
          <h2>
            <strong>tên phim</strong>
            <br/>
            <span>{scheduleTicket.movie}</span>
            
          </h2>
          <ul className='about-schedule'>
            <li> 
              <p className='option'>chọn suất chiếu</p>
              <p className='value'>{scheduleTicket.time_start}</p>
            </li>
            <li> 
              <p className='option'>ngày</p>
              <p className='value'> <span>{scheduleTicket.date}</span></p>
            </li>
            <li> 
              <p className='option'>số lượng</p>
              <p className='value'> {countTicket} <span>vé</span></p> 
            </li>
            <li> 
              <p className='option'>tổng số tiền</p>
              <p className='value'>{totalPrice} <sup>đ</sup></p> 
            </li>
          </ul>
          <ul className='about-seat'>
              <li>số ghế</li>
              <li className='seat-number'>{renderSeat}</li>
          </ul>
        </div>
        <div className="booking-time">
          <span className='title'>Thời gian giữ ghế</span>
          <span> {minutes >= 0 ? minutes : '00'} : {second >= 0 ? second : '00'}</span>
        </div>
      </div>
      <div className="booking-body">
        <div className="booking-wrap">
          <PickTicket 
            data={scheduleTicket}
            countTicket={countTicket}
            totalPrice={totalPrice}
            listBookingSeat={listBookingSeat}
            setCountTicket={setCountTicket}
            setTotalPrice={setTotalPrice}
            setListBookingSeat={setListBookingSeat}
          />
        </div>
      </div>
    </div>
  )
}

export default BookingTicket
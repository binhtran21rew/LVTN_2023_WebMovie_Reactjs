import React,{ useState } from 'react'
import { NavLink } from "react-router-dom";


import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';

import './pickTicket.scss';
import Button from '../../button/Button';
import Food from './food/Food';

const PickTicket = (props) => {
    const {
        countTicket,
        totalPrice,
        listBookingSeat,
        setCountTicket,
        setTotalPrice,
        setListBookingSeat,
        data
    } = props
    const [listticketId, setListTicketId] = useState([]);
    const listSeat = (sold, seat) => {
      if(sold === 1){
        return (
          <Fragment>
            <FontAwesomeIcon icon={faCouch}  className={`slot__item item_picked item_seat_${seat.seat_id}`}> </FontAwesomeIcon>
          </Fragment>
        )
      }else{
        let setSeatBooking = "";
        let index = listBookingSeat?.findIndex((booking) => booking === seat.seat_id);

        if(index !== -1){
          setSeatBooking = "item_chosen"
        }else{
          setSeatBooking = ""
        }
        
        return (
          <Fragment>
              <FontAwesomeIcon 
              icon={faCouch} 
              className={`slot__item ${setSeatBooking} item_seat_${seat.seat_id}`}
              onClick={() => {
                handleBookingSeat(seat)
              }}
            
            > 
            </FontAwesomeIcon>

          </Fragment>

        )
      }
    }
    const handleBookingSeat = (seat) => {
      const seat_id = document.querySelector(`.item_seat_${seat.seat_id}`);
      let index = listBookingSeat.findIndex(
        (booking) => booking === seat.seat_id
      );
      let index_ticket = listticketId.findIndex(
        (ticket) => ticket === seat.id
      )

      if(index_ticket !== -1){
        listticketId.splice(index_ticket, 1);
        setListTicketId([...listticketId]);
      }else{
        setListTicketId([...listticketId, seat.id])
      }

      if(index !== -1){
        listBookingSeat.splice(index, 1);
        seat_id.classList.remove('item_chosen');
        setListBookingSeat([...listBookingSeat]);
        setCountTicket(prev => (prev -1));
        setTotalPrice(prev => (prev - data.price));
      }else{
        setListBookingSeat([...listBookingSeat, seat.seat_id]);
        seat_id.classList.add('item_chosen');
        setCountTicket(prev => (prev + 1));
        setTotalPrice(prev => (prev + data.price));
      }
      
    }
    const renderSeat = () => {
      const {ticket} = data;

      return ticket?.map((seat, i) => {
        return <div key={i} className='item_seat'>{listSeat(seat.status, seat)}</div>
      })

    }
    const renderDetail = (
      <ul className="ShowCase">
        <li>
          <FontAwesomeIcon icon={faCouch} className='slot__item blank'> </FontAwesomeIcon>
          <span>Còn trống</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCouch} className='slot__item chosen'> </FontAwesomeIcon>
          <span>Đang chọn</span>
        </li>
        <li>
        <FontAwesomeIcon icon={faCouch} className='slot__item block'> </FontAwesomeIcon>
          <span>đã đặt</span>
        </li>
      </ul>
    )
    const handleShowFood = (e) => {
      const modal = document.querySelector(`#modal_food`);
      modal.classList.toggle('active');
    }
    const handleTT = (e) => {
      const data = {
        ticket: listticketId,
      }
      console.log(data);

    }
    return (
        <div className="PickTicket row">
          <div className="screen" ></div>
          <div className="slot__picking">
            <div className="slot__row">
                {renderSeat()}
            </div>
          </div>
          <Fragment>{renderDetail}</Fragment>
          <div className="Ticket_input">
            <NavLink to={`/`}>
            <Button 
              className={"ticket-btn"}
            >Quay lại</Button>
            </NavLink>
            <Button 
              className={"ticket-btn"}
              onClick={handleShowFood}
            >chọn thức ăn</Button>
            <Button 
              className={"ticket-btn"}
              onClick={handleTT}
            >thanh toán</Button>
          </div>

          <Food />
        </div>

    )
}

export default PickTicket;
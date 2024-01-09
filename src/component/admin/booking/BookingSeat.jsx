import React,{ useState, Fragment, useEffect  } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { NumericFormat } from 'react-number-format';

import './bookingseat.scss';

import Button from '../../button/Button';
import Food from '../../client/booking/food/Food';
import webApi from '../../../api/webApi';
import swal from 'sweetalert';

const BookingSeat = (props) => {
  const history = useHistory(); 

    const {
        data,
        setData,
        listBookingSeat,
        setListBookingSeat,
        setCountTicket,
        setTotalPrice,
        totalPrice,
        countTicket,
        showSeat,
        schedule
    } = props
    const [listticketId, setListTicketId] = useState([]);
    const [selectFood, setSelectFood] = useState([]);
    const [priceFood, setPriceFood] = useState(0);
    const [payLoad, setPayLoad] = useState(false);

    useEffect(() => {
      if(!!Object.keys(selectFood).length){
        setPriceFood(0);
        for(let key in selectFood){
          setPriceFood(prev => {
            return prev + selectFood[key].price
          })
        }
      }else{
        setPriceFood(0);
      }
    }, [selectFood]);
    useEffect(() => {
      if(payLoad){
        const getTicket = async () =>{
            const result = await webApi.getTicketSchedule(schedule);
            setData(result.data)
        } 
        getTicket();
        setPayLoad(false);
      }

    }, [payLoad]);



    const handleBookingSeat = (seat) => {
      const seat_id = document.querySelector(`.item_seat_${seat.seat_id}`);
      let index = listBookingSeat.findIndex(
        (booking) => booking === seat.seat.number
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
        setListBookingSeat([...listBookingSeat, seat.seat.number]);
        seat_id.classList.add('item_chosen');
        setCountTicket(prev => (prev + 1));
        setTotalPrice(prev => (prev + data.price));
      }
    }

    useEffect(() => {
      if(listBookingSeat.length === 0 ){
        const seat_choose = document.querySelectorAll('.item_chosen')
        seat_choose.forEach((item) => item.classList.remove('item_chosen'))
      }
    }, [listBookingSeat]);
    const handleShowFood = (e) => {
      const modal = document.querySelector(`#modal_food`);
      modal.classList.toggle('active');
    }

    const clearData = () => {
      setListBookingSeat([]);
      setListTicketId([]);
      setSelectFood([]);
      setCountTicket(0);
      setTotalPrice(0);
      setPriceFood(0);
    }
    const handleClearData = () => {
      clearData();
    }

    const handleTT = async (e) => {
      try{
        const today = new Date();
        const momenDay = moment(today).format("YYYY-MM-DD hh:mm");
        const dataMovie = {
          schedule_id: data.id,
          movie: data.movie,
          time: data.time_start,
          date: data.date,
          img: data.post_path,
          ticket: listticketId,
          total_price: totalPrice + priceFood,
          price: data.price,
          count: countTicket,
          listFood: selectFood,
          status: 'đã thanh toán',
          type: 'tt'
        }
        
        const result = await webApi.adminBookingTicket(dataMovie);
        if(result.status === 200) { 
          swal("Success", result.message, "success")
          clearData();
          setPayLoad(true);
        }else{
          swal("Error", result.message, "error");
          clearData();

        }
      }catch(e){}
    }


    const listSeat = (sold, seat ,i) => {
        if(sold === 1){
          return (
            <Fragment key={i}>
              <FontAwesomeIcon icon={faCouch}  className={`slot__item item_picked item_seat_${seat.seat_id}`}></FontAwesomeIcon>
              <span className='number_seat'> 
                {seat.seat.number}
              </span>
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
            <Fragment key={i}>
                <FontAwesomeIcon 
                icon={faCouch} 
                className={`slot__item ${setSeatBooking} item_seat_${seat.seat_id}`}
                onClick={() => {
                  handleBookingSeat(seat)
                }}
              > 
              </FontAwesomeIcon>
              <span className='number_seat'onClick={() => {
                  handleBookingSeat(seat)
                }}>
                {seat.seat.number}
              </span>
            </Fragment>
  
          )
        }
      }
    const renderSeat = () => {
        const {ticket} = data;
        return ticket?.map((seat, i) => {
          if(seat.seat.position !== null){
            const x = parseInt(seat.seat.position?.split(',')[0]);
            const y = parseInt(seat.seat.position?.split(',')[1]);
            return (
                <div  className='item_seat' key={i} style={{transform: `translate(${x}px, ${y}px)`}}>{listSeat(seat.status, seat, i)}</div>
            )
          }else{
            return (
              <div  className='item_seat' key={i}>{listSeat(seat.status, seat, i)}</div>
            )
          }
        })
      }
    const renderSelectSeat = listBookingSeat.map((data, i) => {
      return (
        <span key={i}>{data}</span>
      )
    })
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
    const renderFood = () => {
      if(!!Object.keys(selectFood).length){
        return Object.entries(selectFood).map(([key, item], i) => {
          return(
            <Fragment key={i}>
              <div className='food-item'>
                {item.value}  {item.name}
              </div>

            </Fragment>
          )
        });
      }
    }
    var btnPayment = ''
    if(listBookingSeat.length === 0){
      btnPayment = (
        <Button 
              className={"ticket-btn"}
              onClick={handleTT}
              disabled= {true}
        >thanh toán</Button>
      )
    }else{
      btnPayment = (
        <Button 
              className={"ticket-btn"}
              onClick={handleTT}
              disabled={false}
        >thanh toán</Button>
      )
    }
    return (
        <div className={`AdminPickTicket row  ${showSeat ? 'show' : ''}`}>
          <div className="screen" ></div>
          <div className="slot__picking">
            <div className="slot__row">
                {renderSeat()}
            </div>
          </div>
          <Fragment>{renderDetail}</Fragment>

          <div className="booking-title">
            <div className="booking-overview">
              <h2>
                <strong>tên phim</strong>
                <br/>
                <span>{data.movie}</span>
                
              </h2>
              <ul className='about-schedule'>
                <li> 
                  <p className='option'>chọn suất chiếu</p>
                  <p className='value'>{data.time_start}</p>
                </li>
                <li> 
                  <p className='option'>ngày</p>
                  <p className='value'> <span>{data.date}</span></p>
                </li>
                <li> 
                  <p className='option'>số lượng</p>
                  <p className='value'> {countTicket} <span>vé</span></p> 
                </li>
                <li> 
                  <p className='option'>tổng số tiền</p>
                  <p className='value'>{totalPrice + priceFood} <sup>đ</sup></p> 
                </li>
              </ul>
              <ul className='about-seat'>
                  <li>số ghế</li>
                  <li className='seat-number'>{renderSelectSeat}</li>
              </ul>
              <ul className='about-seat'>
                  <li>thức ăn</li>
                  <li className='seat-number'>{renderFood()}</li>
              </ul>
            </div>
          </div>
          <div className="Ticket_input">
            <Button 
              className={"ticket-btn"}
              onClick={handleClearData}
            >Xóa thông tin chọn</Button>
            <Button 
              className={"ticket-btn"}
              onClick={handleShowFood}
            >chọn thức ăn</Button>
            {btnPayment}
          </div>

          <Food selectFood= {selectFood} setSelectFood= {setSelectFood}/>

        </div>
    )
}

export default BookingSeat
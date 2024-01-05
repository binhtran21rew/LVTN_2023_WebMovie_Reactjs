import React,{ useState, Fragment, useEffect  } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment'
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { NumericFormat } from 'react-number-format';



import './pickTicket.scss';


import Button from '../../button/Button';
import Food from './food/Food';
import image from '../../../file/image/combo.jpg';


import webApi, {getPayment, getType} from '../../../api/webApi';

const PickTicket = (props) => {
  const history = useHistory(); 
    const {
        minutes,
        second,
        countTicket,
        totalPrice,
        listBookingSeat,
        setCountTicket,
        setTotalPrice,
        setListBookingSeat,
        data
    } = props

    const [listticketId, setListTicketId] = useState([]);
    const [selectFood, setSelectFood] = useState([]);

    const listSeat = (sold, seat ,i) => {
      
      if(sold === 1){
        return (
          <Fragment key={i}>
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
          <Fragment key={i}>
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
    const renderSeat = () => {
      const {ticket} = data;

      return ticket?.map((seat, i) => {
        return <div key={i} className='item_seat'>{listSeat(seat.status, seat, i)}</div>
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
          total_price: totalPrice,
          price: data.price,
          count: countTicket,
          selectFood,
          minutes,
          second
        }
        history.push({
          pathname: '/checkout',
          state: {data: dataMovie}
        });

      }catch(e){}
      

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
    const [price, setPrice] = useState(0)
    useEffect(() => {
      if(!!Object.keys(selectFood).length){
        setPrice(0);
        for(let key in selectFood){
          setPrice(prev => {
            return prev + selectFood[key].price
          })
        }
      }else{
        setPrice(0);
      }

      

    }, [selectFood]);


    const renderFood = () => {
      if(!!Object.keys(selectFood).length){
        return Object.entries(selectFood).map(([key, item], i) => {
          return(
            <Fragment key={i}>
              <div className='food-item'>
                {item.value} x {item.name}
              </div>

            </Fragment>
          )
        });
      }
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
          <div className="list-food">
            
            {!!Object.keys(selectFood).length && (
              <div className="image">
                <img src={image} alt="" />
              </div>
            )}
            <div className="total">
              { !!Object.keys(selectFood).length && (

                <span>
                  <NumericFormat value={price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                </span>
              ) }

              {renderFood()}
            </div>
          </div>
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
            {btnPayment}
          </div>

          <Food selectFood= {selectFood} setSelectFood= {setSelectFood}/>
        </div>

    )
}

export default PickTicket;
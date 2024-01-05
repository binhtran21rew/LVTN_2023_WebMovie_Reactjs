import React, {useState, useEffect, Fragment} from 'react';
import { NumericFormat } from 'react-number-format';
import { Select} from 'antd';
import swal from "sweetalert";
import moment from 'moment'

import './booking.scss';

import {groupBy} from '../../../component/admin/helper';
import PaginationItem from '../../../component/pagination/Pagination';
import webApi, {getType, getMethod} from '../../../api/webApi';
import Modal, { ModalContent } from '../../../component/modal/Modal';
import {optionSearchBooking} from '../../../component/content/Content';
import AdminSearch from '../../../component/admin/search/AdminSearch';


const Bookings = ({list}) =>{
    const [loading ,setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [payload, setPayload] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const result = await webApi.getAll(getType.Booking, getMethod.getAll);
                setBookings(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadData();
    }, []);
    useEffect(() => {
        const loadData = async () => {
            try{
                const result = await webApi.getAll(getType.Booking, getMethod.getAll);
                setBookings(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadData();
        setPayload(false)
    }, [payload]);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;
    const endPage = itemPage + itemPerPge;
    const currentItems =bookings?.slice(itemPage, endPage);
    const pageCount = Math.ceil(bookings.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % bookings.length;
        setItemPage(newPage);
    }
    const showModal = (id) => {
        const modal = document.querySelector(`#modal_${id}`);
        modal.classList.toggle('active');
    }
    const handleChangeFilter = (value) =>{
        setFilter(value)
    }
    var viewDisplay = '';
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        if(currentItems.length > 0){
            viewDisplay = currentItems.map((data, i) => {
                return (
                    <tr key={i} onClick={() => showModal(data.id)}>
                        <td>{data.id}</td>
                        <td>{data.user.id}</td>
                        <td>{data.count}</td>
                        <td>
                        <NumericFormat value={data.price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                        </td>
                        <td>{data.date}</td>
                        <td>{data.status}</td>
                    </tr>
                )
            })
        }else{
            viewDisplay = (
                <tr className='nodata'>
                    <td colSpan={6}> No data in here!</td>
                </tr>
            )
        }
    }
    return (
        <div className="ListBooking-page">
            <div className="page-header">
                <Select
                    defaultValue="Filter"
                    style={{ width: 120 }}
                    onChange={handleChangeFilter}
                    options={optionSearchBooking}
                    className='select-custom'
                />
                <AdminSearch type='booking' filter={filter} disabled={filter === ''}/>
            </div>
            <div className="table_movie">
                <section className="table__body" >
                    <table className='booking'>
                        <thead>
                            <tr>
                                <th>booking id</th>
                                <th>user</th>
                                <th>ticket number</th>
                                <th>price</th>
                                <th>date</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                           {viewDisplay}
                        </tbody>
                    </table>
                    <PaginationItem handleClick={handleClick} pageCount={pageCount}/> 

                </section>
            </div>
            {bookings.map((data, i) => <DetailBooking key={i} data={data} setPayload={setPayload}/>)}
        </div>
    )
}


const DetailBooking = (props) => {
    const item = props.data;
    const [ticket, setTicket] = useState([]);
    const [payment, setPayment] = useState([]);
    const [user, setUser] = useState([]);
    const [food, setFood] = useState([]);

    useEffect(() => {
        var mounted = true;
        if(mounted){
            setTicket(item.ticket);
            setPayment(item.payment);
            setUser(item.user);
            setFood(item.food);

        }
        return () => {
            mounted = false;
        }
    }, [item]);
    const handlePayment = (id) => {
        const today = new Date();
        const momenTime = moment(today).format("hh:mm");
        const momenDay = moment(today).format("YYYY-MM-DD");
        swal({
            title: "Xác nhận thanh toán?",
            text: "Sau khi xác nhận, giao dịch này sẽ được chấp thuận!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                try{

                    const param = {
                        id_booking: id,
                        date: momenDay,
                        time: momenTime,
                        payment: 'tt',
                        price: item.price,
                        status: 'đã thanh toán'
                    }
                    const result = await webApi.changeBookingTicket(param);
                    if(result.status === 200){
                        swal(result.message, {
                            icon: "success",
                        });
                        props.setPayload(true);
                    }else{
                        swal('Error',result.message, 'error')
                        props.setPayload(true);
                    }

                }catch(err){}
            } else {
            }
          });
    }

    const userDisplay = (
        <table className='user'>
            <thead>
                <tr>
                    <th>user id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>gender</th>
                    <th>phone</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
            </tr>
            </tbody>
        </table> 
    )

    const ticketDisplay = (
        <table className='ticket'>
            <thead>
                <tr>
                    <th>room name</th>
                    <th>ticket id</th>
                    <th>seat booking</th>
                    <th>price (per one)</th>
                </tr>
            </thead>
            <tbody>
                {    

                        ticket.map((data, i) => {
                            return (
                            <tr key={i}>
                                {(i < 1) ? <td rowSpan={i}>{data.seat.room.name}</td> : <td hidden></td>}
                                <td>{data.id}</td>
                                <td>{data.seat.id}, số {data.seat.number}</td>
                                {(i < 1) ? 
                                <td rowSpan={i}>
                                    <NumericFormat value={data.schedule.price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                                </td> 
                                : <td hidden></td>}

                            </tr>
                        )
                    })
                }
            </tbody>
        </table> 
    )

    const scheduleDisplay = (
        <table className='schedule'>
        <thead>
            <tr>
                <th>movie</th>
                <th>day</th>
                <th>time start</th>
                <th>time end</th>
            </tr>
        </thead>
        <tbody>
            {    

                    ticket.map((data, i) => {
                        return (
                        <tr key={i}>
                            {(i < 1) ? <td rowSpan={i}>{data.schedule.movie.title}</td> : <td hidden></td>}
                            {(i < 1) ? <td rowSpan={i}>{data.schedule.date}</td> : <td hidden></td>}
                            {(i < 1) ? <td rowSpan={i}>{data.schedule.time_start}</td> : <td hidden></td>}
                            {(i < 1) ? <td rowSpan={i}>{data.schedule.time_end}</td> : <td hidden></td>}
                        </tr>
                    )
                })
            }
        </tbody>
    </table> 
    )
    const paymentDisplay = (
        <table className='payment'>
            <thead>
                <tr>
                    <th>payment id</th>
                    <th>type</th>
                    <th>price payment</th>
                    <th>date payment</th>
                    <th>time payment</th>
                </tr>
            </thead>
            <tbody>
                {payment.length !== 0 ? (
                    <tr>
                        <td>{payment.id}</td>
                        <td>{payment.type}</td>
                        <td>
                        <NumericFormat value={payment.price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                        </td>
                        <td>{payment.date}</td>
                        <td>{payment.time}</td>
                    </tr>
                ) : (
                        <tr>
                            <td colSpan={5} onClick={() => handlePayment(item.id)}> Chưa Thanh Toán</td>
                        </tr>
                )}

            </tbody>
        </table> 
    )
    const foodOrderDisplay = () => {
        if(food.length > 0){
            const idFood = groupBy(
                food,
                'id',
            )
    
            return (

                <table className='ticket'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>detail</th>
                            <th>quantity</th>
                            <th>price (per one)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {    
                        Object.entries(idFood).map(([key, value], i) => 
                            {
                               
                                return (
                                    <tr>
                                        <td>{value[0].name}</td>
                                        <td>{value[0].detail}</td>
                                        <td>{value.length}</td>
                                        <td>
                                            <NumericFormat value={value[0].price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                                        </td>
                                    </tr>
                                )
                            }
                           

                        )
                    }
                    </tbody>
                </table> 

            )
        }else{
            return(
                <table className='ticket'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>detail</th>
                            <th>quantity</th>
                            <th>price (per one)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4}> No data in here!</td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    }

    const totalPrice = () => {
        if(payment.length !== 0){
            return (
                <div>
                    Đã thanh toán:
                    <span>
                        <NumericFormat value={item.price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                    </span>

                </div>
            )
        }else{
            return(
                <div>
                    Số tiền cần thanh toán:
                    <span>
                        <NumericFormat value={item.price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                    </span>
                </div>
            )
        }
    }
    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent className="booking_modal">
                <div className="table_movie">
                    <section className="table__body" >

                        <div>User</div>
                        {userDisplay}

                        <div>Movie</div>
                        {scheduleDisplay}

                        <div>ticket</div>
                        {ticketDisplay}

                        <div>food order</div>
                        {foodOrderDisplay()}

                        <div>payment</div>
                        {paymentDisplay}
                    </section>

                    <div className="table_footer">
                        <div className='title'>
                            {totalPrice()}
                        </div>
                        
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default Bookings;
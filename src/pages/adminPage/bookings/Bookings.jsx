import React, {useState, useEffect} from 'react';
import { NumericFormat } from 'react-number-format';

import './booking.scss';

import PaginationItem from '../../../component/pagination/Pagination';
import webApi, {getType, getMethod} from '../../../api/webApi';
import Modal, { ModalContent } from '../../../component/modal/Modal';

const Bookings = ({list}) =>{
    const [loading ,setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const result = await webApi.getAll(getType.Booking, getMethod.getAll);
            setBookings(result)
            setLoading(false);
        }

        loadData();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            const result = await webApi.getAll(getType.Booking, getMethod.getAll);
            setBookings(result)
            setLoading(false);
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

                        <td>
                            {/* <button >
                                <FontAwesomeIcon icon={faPenToSquare} className='movie-icon' onClick={() => handleEdit(data.id)}/>
                            </button>
    
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDelete(data.id)}/>
                            </button> */}
                        </td>
    
                    </tr>
                )
            })
        }else{
            viewDisplay = (
                <tr className='nodata'>
                    <td colSpan={4}> No data in here!</td>
                </tr>
            )
        }
    }
    return (
        <div className="ListCast-page">
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
                                <th>option</th>
                            </tr>
                        </thead>
                        <tbody>
                           {viewDisplay}
                        </tbody>
                    </table>
                    <PaginationItem handleClick={handleClick} pageCount={pageCount}/> 

                </section>
            </div>
            {bookings.map((data, i) => <DetailBooking key={i} data={data}/>)}
        </div>
    )
}


const DetailBooking = (props) => {
    const item = props.data;
    const [ticket, setTicket] = useState(item.ticket);
    const [payment, setPayment] = useState(item.payment);
    const [user, setUser] = useState(item.user);
    const [food, setFood] = useState(item.food);

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
                                <td>{data.seat.id}</td>
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
            <tr>
                <td>{payment.id}</td>
                <td>{payment.type}</td>
                <td>
                <NumericFormat value={payment.price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                </td>
                <td>{payment.date}</td>
                <td>{payment.time}</td>
            </tr>
            </tbody>
        </table> 
    )
    
    



    return (
        <Modal  active={false} id={`modal_${item.id}`}>
            <ModalContent className="booking_modal">
                <div className="table_movie">
                    <section className="table__body" >

                        <div>User</div>
                        {userDisplay}

                        <div>Movie</div>
                        {scheduleDisplay}

                        <div>ticket</div>
                        {ticketDisplay}

                        <div>payment</div>
                        {paymentDisplay}
                    </section>

                    <div className="table_footer">
                        <div className='title'>
                            total price:
                            <span>
                                <NumericFormat value={payment.price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                            </span>
                        </div>
                        
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default Bookings;
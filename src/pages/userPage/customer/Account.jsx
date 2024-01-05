import React, { useState, useEffect, Fragment } from 'react'


import swal from "sweetalert";
import { faCheck, faTimes, faInfoCircle, faIceCream, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NumericFormat } from 'react-number-format';
import moment from 'moment'


import './account.scss';

import Button from '../../../component/button/Button';
import { ChangeInfomation, ChangePassword } from '../../../component/changeInfo/ChangeInfo'
import Input, { InputDefault, InputRadio } from '../../../component/input/Input';
import webApi, { getType } from '../../../api/webApi';

const Account = () => {
    const [account, setAccount] = useState([]);
    const [booking, setbooking] = useState([]);
    const [changeInfo, setChangeInfo] = useState(false);
    const [changePass, setChangePass] = useState(false);

    const istablet = useMediaQuery('(max-width:1140px');
    useEffect(() => {
        const getAccount = async () => {
            const result = await webApi.getUser();
            setAccount(result.data);
            setbooking(result.data.booking);
        }
        getAccount();
    }, []);

    const handleEdit = () => {
        setChangeInfo(!changeInfo);
        setChangePass(false);

    }
    const handleEditPass = () => {
        setChangePass(!changePass);
        setChangeInfo(false);
    }
    var viewTicket = '';

    if(booking.length > 0){
        viewTicket = 
        <table>
            <thead>
                <tr>
                    <th>mã vé</th>
                    <th>tên phim</th>
                    <th>thời gian đặt</th>
                    <th>số ghế</th>
                    <th>tổng hóa đơn</th>
                </tr>
            </thead>
            <tbody>
                {
                    booking.map((dataBooking, i) => {
                        return (
                            <tr key={i}>
                                <td>{dataBooking.id}</td>
                                <td>
                                    {
                                        dataBooking?.ticket.map((dataTicket, i) => 
                                        {   
                                            if((dataTicket.booking_id === dataBooking.id) && i < 1) {
                                                return(
                                                    <Fragment key={i}>
                                                        <span className='item-seat'> {dataTicket.schedule.movie.title}</span>
                                                    </Fragment>
                                                )
                                            }
                                        })
                                    }
                                </td>
                                <td>
                                    {
                                        dataBooking?.ticket.map((dataTicket, i) => 
                                        {   
                                            if((dataTicket.booking_id === dataBooking.id) && i < 1) {
                                                return(
                                                    <Fragment key={i}>
                                                        <span className='item-seat'> {moment(dataTicket.updated_at).format("YYYY-MM-DD")}</span>
                                                    </Fragment>
                                                )
                                            }
                                        })
                                    }
                                </td>
                                <td>
                                    {
                                        dataBooking?.ticket.map((dataTicket, i) => {
                                            if(dataTicket.booking_id === dataBooking.id) {
                                                return(
                                                    <Fragment key={i}>
                                                        <span className='item-seat'> {i+1}: {dataTicket.seat_id}</span>
                                                    </Fragment>
                                                )
                                            }
                                        })
                                    }
                                </td>
                                <td>
                                    <NumericFormat value={dataBooking.total_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                                </td> 
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    }

    const tableInfo = (
        <section className="table__body" >
            <table>
                <thead>
                    <tr>
                        <th>họ tên</th>
                        <th>giới tính</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>vai trò</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{account.name}</td>
                        <td>{account.gender === '' ? 'unset' : account.gender}</td>
                        <td>{account.email}</td>
                        <td>{account.phone}</td>
                        <td>{account.role}</td>
                    </tr>
                </tbody>
            </table>
            <Button 
            className='btn_account_info'
            onClick={handleEdit}
            >Thay đổi thông tin </Button>
            <Button 
            className='btn_account_info'
            onClick={handleEditPass}
            >Thay đổi password </Button>
        </section>
    )

    return (
        <div className="Account-page section">
            <div className="account-wrapper">
                <div className="content-body">
                    <div className="title section">Thông tin cá nhân</div>    
                    <div className="body-content section">
                        {istablet ? <div className="table">{tableInfo}</div> : (
                            <>
                                <div className="table-info">
                                    <ul>
                                        <li>
                                            <span className='title-item'> họ tên: </span>  
                                            <span>{account.name}</span>
                                        </li>
                                        <li>
                                            <span className='title-item'> giới tính: </span>  
                                            <span>{account.gender === '' ? 'unset' : account.gender}</span>
                                        </li>
                                        <li>
                                            <span className='title-item'> email: </span>  
                                            <span>{account.email}</span>
                                        </li>
                                        <li>
                                            <span className='title-item'> phone: </span>  
                                            <span>{account.phone}</span>
                                        </li>
                                        <li>
                                            <span className='title-item'> phone: </span>  
                                            <span>{account.role}</span>
                                        </li>
                                        
                                    </ul>
                                    
                                </div>
                                <Button 
                                    className='btn_account_info'
                                    onClick={handleEdit}
                                    >Thay đổi thông tin 
                                </Button>
                                <Button 
                                className='btn_account_info'
                                onClick={handleEditPass}
                                >Thay đổi password </Button>
                            </>
                        )}
                    </div>
                </div>
                <div className="content-body ">
                    <div className="title section">Lịch sử đặt vé</div>
                    <div className="body-content section">
                        <div className="table tablet-ticket">
                            <section className="table__body" >
                            {viewTicket}
                            </section>
                        </div>

                    </div>
                </div>
            </div>

            {
                <ChangeInfomation
                    changeInfo = {changeInfo}
                    id = {account.id}
                    email = {account.email}
                    phone = {account.phone}
                    name = {account.name}
                    checkBox = {account.gender}
                /> 
            }
            {
                <ChangePassword 
                    changeInfo = {changePass}
                    id = {account.id}
                />
            }

        </div>
    )
}

export default Account
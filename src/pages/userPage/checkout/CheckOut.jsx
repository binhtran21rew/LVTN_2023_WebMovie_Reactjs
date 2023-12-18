import React, { Fragment, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';


import './checkout.scss';

import { InputRadio } from '../../../component/input/Input';
import Button from '../../../component/button/Button';

import {apiWeb} from '../../../api/apiConfig';
import webApi, {getPayment, getType} from '../../../api/webApi';
const CheckOut = () => {
    const paymentOption = [
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
    ]
    const location = useLocation();
    const data = location.state.data;
    const img = `${apiWeb.baseUrl}${data.img}`

    const [payment, setPayment] = useState('');

    const handleCheckbox = (e) => {
        setPayment(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataPayment = {
            total_price: data.total_price,
            count: data.count,
            status: "đã thanh toán",
            ticket: data.ticket,
            type: payment
        }

        try{
            const result = await webApi.payment(payment, dataPayment);
            if(result){
                window.location.href = result;
            }
        }catch(e){

        }
        
    }
    return (
        <div className="CheckOut-page">
            <div className="checkout-wrapper">
                <div className="checkout-ticket">
                    <div className="ticket-info">
                        <div className="item-movie">
                            <div className="item-movie_img">
                                <img src={img} alt="" />
                            </div>
                            <div className="item-movie_text">
                                <h3>{data.movie}</h3>
                                <p>Ngày chiếu:  <span>{data.date}</span></p>
                                <p>thời gian chiếu:  <span>{data.time}</span></p>
                            </div>

                        </div>
                        <div className="item-ticket">
                            <div className="item-title">
                                Ghế
                            </div>
                            <div className="item-seat">
                                <ul>
                                    {data.ticket.map((item, i) => (
                                        <li key={i}>
                                            {item}
                                            <span><NumericFormat value={data.price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                        <div className="item-total">
                            <div className="title">
                                Tổng tiền
                            </div>
                            <span><NumericFormat value={data.total_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></span>
                        </div>
                    </div>
                </div>
                <div className="checkout-ticket payment">
                    <form onSubmit={handleSubmit}>
                        <div className="form-text">
                            <div className='title'>cách thức thanh toán</div>
                            <div className="payment_method">
                                {paymentOption.map((data) => (
                                    <div key={data.id}>
                                        <InputRadio 
                                            onChange={handleCheckbox}
                                            className="input_checkbox"
                                            name="payment_method"
                                            value={data.value}
                                        />
                                        <span>{data.display}</span>
                                    </div>
                                ))}
                               
                            </div>
                            <div className="payment_button">
                                <NavLink to={`/booking/${data.schedule_id}`}>
                                    <Button className={"ticket-btn"}> Quay lại </Button>
                                </NavLink>
                                <Button 
                                    className={"ticket-btn"}
                                >Thanh toán</Button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}

export default CheckOut
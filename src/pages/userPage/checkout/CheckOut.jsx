import React, { Fragment, useState, useEffect } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import swal from "sweetalert";
import moment from 'moment'


import './checkout.scss';

import { InputRadio } from '../../../component/input/Input';
import Button from '../../../component/button/Button';

import {apiWeb} from '../../../api/apiConfig';
import webApi, {getPayment, getType} from '../../../api/webApi';
import { paymentOption } from '../../../component/content/Content';
import { DoughnutController } from 'chart.js';
const CheckOut = () => {
    const location = useLocation();
    const data = location.state.data;
    const img = `${apiWeb.baseUrl}${data.img}`
    const [payment, setPayment] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [timeCountDown, setTimeCountDown] = useState(data.minutes * 60 + parseInt(data.second));
    const minutes = Math.floor(timeCountDown / 60).toString().padStart(2, '0');
    const second = Math.floor(timeCountDown % 60).toString().padStart(2, '0');
    useEffect(() => {
        const timer = setTimeout(() =>{
          setTimeCountDown(timeCountDown -1);
    
        }, 1000);
        if(timeCountDown === 0) {
          setTimeout(() => {
            swal('Warn', 'your time out to booking', 'warning');
            window.location.replace('/')
          },3000)
        }
      }, [timeCountDown]);
    useEffect(() => {
        if(!!Object.keys(data.selectFood).length){
            setTotalPrice(0);
            for(let key in data.selectFood){
              setTotalPrice(prev => {
                return prev + data.selectFood[key].price
              })
            }
          }else{
            setTotalPrice(0);
          }
    }, []);

    const handleCheckbox = (e) => {
        setPayment(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(payment === 'momo'){
            const dataPayment = {
                total_price: totalPrice + data.total_price,
                count: data.count,
                status: "đã thanh toán",
                ticket: data.ticket,
                type: payment,
                'listFood[]': data.selectFood
            }
            try{
                const result = await webApi.payment(payment, dataPayment);
                if(result.status === 401){
                    swal('Error', result.message, 'error');
                }
                if(result){
                    window.location.href = result;
                }
            }catch(e){
    
            }
            
        }else if(payment === 'vnpay'){
            const dataPayment = {
                total_price: totalPrice + data.total_price,
                count: data.count,
                status: "đã thanh toán",
                ticket: data.ticket,
                type: payment,
                'listFood[]': data.selectFood,
                'redirect': true
            }
            localStorage.setItem('data', JSON.stringify(dataPayment));
            const result = await webApi.payment(payment, dataPayment);
            if(result.status === 401){
                swal('Error', result.message, 'error');
            }
            if(result.data){
                window.location.href = result.data;
            }
        }else{
            const today = new Date();
            const momenTime = moment(today).format("hh:mm");
            const momenDay = moment(today).format("YYYY-MM-DD");
            const dataPayment = {
                date: momenDay,
                time: momenTime,
                total_price: totalPrice + data.total_price,
                count: data.count,
                status: "Chưa thanh toán",
                ticket: data.ticket,
                type: payment,
                'listFood[]': data.selectFood
            }

            const result = await webApi.bookingTicket(dataPayment);
            if(result.status === 200){
                swal('Success', result.message, 'success');
            }else{
                swal('Warning', result.message, 'warning');
            }
        }

    }
    return (
        <div className="CheckOut-page">
            <div className="booking-time">
                <span className='title'>Thời gian đặt vé</span>
                <span> {minutes >= 0 ? minutes : '00'} : {second >= 0 ? second : '00'}</span>
            </div>
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
                                Tổng tiền Vé
                            </div>
                            <span><NumericFormat value={data.total_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></span>
                        </div>
                        <div className="item-ticket">
                            <div className="item-title">
                                Combo
                            </div>
                            <div className="item-seat">
                                <ul>
                                    {
                                        Object.entries(data.selectFood).map(([key, item], i) => {
                                            return(
                                              <li key={i}>
                                                  {item.value} x {item.name}
                                                  <span><NumericFormat value={item.price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></span>
                                              </li>
                                            )
                                          })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="item-total">
                            <div className="title">
                                Tổng tiền Thức ăn
                            </div>
                            <span><NumericFormat value={totalPrice}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></span>
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
                            {payment === 'TT' ? (
                                <div className='payment-caution'>
                                    <span>
                                        Lưu ý khi chọn thanh toán trực tiếp: bạn phải đến trước thời gian chiếu phim <strong>15 phút</strong> để 
                                        tiến hành thanh toán, nếu không thông tin vé phim của bạn sẽ bị hoàn tác và bạn không thể sử dụng vé đã đặt.
                                    </span>
                                </div>
                            ) : ''}

                            <div className="item-total">
                                <span><NumericFormat value={totalPrice + data.total_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></span>
                                <div className="title">
                                    Tổng tiền:
                                </div>
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
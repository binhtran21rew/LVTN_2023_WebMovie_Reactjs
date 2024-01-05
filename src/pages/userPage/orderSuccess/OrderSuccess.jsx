import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import moment from 'moment'
import { NumericFormat } from 'react-number-format';

import './ordersuccess.scss';
import webApi, {getPayment, getType} from '../../../api/webApi';

const OrderSuccess = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    var paymentId = '';
    var extraData = '';
    var message = '';
    var paymentInfo = '';
    var paymentCount = '';
    var dataPayment = ''
    var data = '';
    const [checkPayment, setCheckPayment] = useState(true);
    const today = new Date();
    const momenTime = moment(today).format("hh:mm");
    const momenDay = moment(today).format("YYYY-MM-DD");

    if(queryParameters.get('vnp_BankCode')){
        if(!localStorage.getItem('data')){
            window.location.href = '/'
        }
        paymentId = queryParameters.get('vnp_TxnRef');
        paymentCount = queryParameters.get('vnp_Amount') /100;
        message = queryParameters.get('vnp_OrderInfo');
        paymentInfo = queryParameters.get('vnp_BankCode');
        const local = JSON.parse(localStorage.getItem('data'))
        data = {
            date: momenDay,
            total_price: local.total_price,
            count: local.count,
            status: local.status,
            ticket: local.ticket,
            time: momenTime,
            type: local.type,
            paymentId,
            'listFood[]': local['listFood[]']
        }
        
    }else{
        paymentId = queryParameters.get("orderId");
        message = queryParameters.get("message");
        paymentInfo = queryParameters.get("orderInfo");
        paymentCount = queryParameters.get("amount");
        extraData = queryParameters.get("extraData");
        dataPayment = JSON.parse(atob(extraData));
        data = {
            date: momenDay,
            total_price: dataPayment.total_price,
            count: dataPayment.count,
            status: dataPayment.status,
            ticket: dataPayment.ticket,
            time: momenTime,
            type: dataPayment.type,
            paymentId,
            'listFood[]': dataPayment.listFood
        }
        
    }

    useEffect(() => {
        if(queryParameters){
            if(checkPayment){
                if(message === "Successful."){
                    const uploadData = async () => {
                        const result = await webApi.bookingTicket(data);
                        if(result.status === 200){
                            swal('Success', result.message, 'success');
                            localStorage.removeItem('data');
                        }else{
                            swal('Warning', result.message, 'warning');
                            localStorage.removeItem('data');
                        }
                    }
                    uploadData()
                    setCheckPayment(false);
                }
                
            }
        }
    
    }, []);

    if(queryParameters.size === 0){
        window.location.href = '/'
    }
    
  
    return (
        <div className="OrderSuccess-page">
            <div className="content-wrapper">
                {message !== 'Successful.' ? (
                    <>
                        <div className="title">
                            Mã giao dịch <span>{paymentId}</span> thất bại. Phiên giao dịch của quý khách đã kết thúc ! <br/>
                            Khách hàng vui lòng quay lại trang chủ <Link to='/'>tại đây.</Link>
                        </div>
                    </>
                ): (
                    <>
                        <div className="title">
                            Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng dịch vụ.
                        </div>
                        <div className="info">
                            <div>Mã giao dịch thanh toán: <span>{paymentId}</span>.</div>
                            <div>Phương thức thanh toán <span>{paymentInfo}</span>.</div>
                            <div>Số tiền đã thanh toán: <span><NumericFormat value={paymentCount}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></span>.</div>
                            <div>Quý khách có thể xem đơn đặt vé <Link to='/customer/account'>tại đây.</Link></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default OrderSuccess
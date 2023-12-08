import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import moment from 'moment'


import './ordersuccess.scss';
import webApi, {getPayment, getType} from '../../../api/webApi';

const OrderSuccess = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const [checkPayment, setCheckPayment] = useState(true);
    var paymentId = '';
    var extraData = '';
    var message = '';
    var paymentInfo = '';
    var paymentCount = '';
    if(queryParameters.size === 0){
        window.location.href = '/'
    }
    paymentId = queryParameters.get("orderId");
    extraData = queryParameters.get("extraData");
    message = queryParameters.get("message");
    paymentInfo = queryParameters.get("orderInfo");
    paymentCount = queryParameters.get("amount");
    const dataPayment = JSON.parse(atob(extraData));
    // message=Successful
    useEffect(() => {
        if(checkPayment){
            if(message === "Successful."){
                const today = new Date();
                const momenTime = moment(today).format("hh:mm");
                const momenDay = moment(today).format("YYYY-MM-DD");
        
                const data = {
                    date: momenDay,
                    total_price: dataPayment.total_price,
                    count: dataPayment.count,
                    status: dataPayment.status,
                    ticket: dataPayment.ticket,
                    time: momenTime,
                    type: dataPayment.type,
                    paymentId
                }
                const uploadData = async () => {
                    const result = await webApi.bookingTicket(data);
                }
    
                uploadData();
                setCheckPayment(false);
            }
            
        }
    }, [queryParameters]);


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
                            <div>Số tiền đã thanh toán: <span>{paymentCount}</span>.</div>
                            <div>Quý khách có thể xem đơn đặt vé <Link to='/customer/account'>tại đây.</Link></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default OrderSuccess
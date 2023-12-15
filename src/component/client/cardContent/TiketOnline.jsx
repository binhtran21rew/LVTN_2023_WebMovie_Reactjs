import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment'

import './tiketOnline.scss';
import webApi from '../../../api/webApi';
import {groupBy} from '../../admin/helper';

const TicketOnline = () => {
    const history = useHistory();
    const [movies, setMovies] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [maphim, setMaphim] = useState('DEFAULT');
    const [day, setDay] = useState('DEFAULT');
    const [time, setTime] = useState('DEFAULT');
    const [checkSelectMovie, setCheckSelectMovie] = useState(false);
    const [checkSelectDay, setCheckSelectDay] = useState(false);

    useEffect(() => {
        const getMovies = async () => {
            const result = await webApi.getContentMovie(1);
            setMovies(result);
        }
        getMovies()

    }, []);

    useEffect(() => {
        if(maphim !== "DEFAULT"){
            setCheckSelectMovie(true)
            setDay('DEFAULT')
        }else{
            setCheckSelectMovie(false)
        }
        const getDay = async () => {
            const result = await webApi.getBookingSchedule(maphim);
            setSchedules(result);
        }
        getDay();
    }, [maphim]);
    useEffect(() => {
        if(day !== 'DEFAULT'){
            setCheckSelectDay(true)
        }else{
            setCheckSelectDay(false)
        }
    }, [day]);
    useEffect(() => {
        if(time !== 'DEFAULT'){
            history.push(`/booking/` + time);
        }
    }, [time]);
    const handleInputMovie = (e) => {
        setMaphim(e.target.value);
    }
    const handleInputDay = (e) => {
        setDay(e.target.value);
    }
    const handleInputSchedule = (e) => {
        setTime(e.target.value);
    }


    const renderMovies = () => {
        if(movies.length > 0){
            return movies.map((data,i) => {
                return (
                    <option value={data.id} key={i}>
                        {data.title}
                    </option>
                )
            })
        }
    }
    const renderDay = () => {
        if(checkSelectMovie){
            const listLichChieu = groupBy(
                schedules,
                "date"
            );

            let entries = Object.entries(listLichChieu);
            if(schedules.length > 0){
                return entries.map(([value], i) => {
                    return (
                      <option value={value} key={i}>
                        {value}
                      </option>
                    );
                });   
            }
            return <option disabled >
                        vui lòng chọn phim khac
                    </option>
        }else{
            return (
                <option disabled >
                    vui lòng chọn phim
                </option>
              );
        }
    }
    const date = new Date();
    const momenTime = moment(date).format("HH::mm::ss")
    const momenDay = moment(date).format("YYYY-MM-DD");

    const renderSchedule = () => {
        if(!checkSelectMovie){
            return (
                <option disabled>
                    vui lòng chọn phim và ngày
                </option>
              );
        }
        if(!checkSelectDay){
            return (
                <option disabled>
                    vui lòng chọn ngày
                </option>
            );
        }
        return schedules.map((data, i) => {
            if(day === data.date){
                if(data.date === momenDay && data.time_start < momenTime){
                    return (
                        <option value={data.id} disabled key={i} className='custom_time'>
                            {data.time_start}
                        </option>
                    )
                }else{
                    return (<option value={data.id}  key={i} className='custom_time'>
                        {data.time_start}
                    </option>)
                }

            }
        })
        
    }

    return (
        <div className="cart-content">
            <div className="cart-wrap">
                <div className="title">
                    mua vé online
                </div>
                <div className="list">
                    <div  className="select-item">
                        <select
                            className='select-header'
                            name="id_movie"
                            id="id_movie"
                            onChange={handleInputMovie}
                        >
                            <option value="DEFAULT">Chọn phim</option>
                            {renderMovies()}
                        </select>
                    </div>
                    <div  className="select-item">
                        <select
                            className='select-header'
                            name="day"
                            id="day"
                            onChange={handleInputDay}
                            value={day}
                        >

                            <option value="DEFAULT">Chọn ngày</option>
                            {renderDay()}
                        </select>

                    </div>
                    <div  className="select-item">
                        <select
                            className='select-header'
                            name="schedule"
                            id="schedule"
                            onChange={handleInputSchedule}
                        >
                            <option value="DEFAULT">Chọn suất chiếu</option>
                            {renderSchedule()}
                        </select>
                    </div>
                    <div  className="select-item none">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketOnline;
import React,  { Fragment, useState, useEffect} from 'react'
import { useParams,  useHistory } from 'react-router-dom';
import moment from 'moment'

import './bookingMovie.scss';


import TicketOnline from '../../../component/client/cardContent/TiketOnline';
import webApi, { getType } from '../../../api/webApi';
import { apiWeb } from '../../../api/apiConfig';
import { groupBy } from '../../../component/admin/helper';

const BookingMovie = () => {
  const history = useHistory();
  const {idMovie} = useParams();
  const [movie, setMovie] =useState([]);
  const [schedules, setSchedules] = useState([]);
  const [day, setDay] = useState('DEFAULT');
  const [checkDay, setCheckDay] = useState(false);
  const poster = `${apiWeb.baseUrl}${movie.post_path}`;
  useEffect(() => {
    const getMovie = async () => {
      const result = await webApi.getId(getType.Movie, idMovie);
      setMovie(result);
    }

    const getDay = async () => {
      const result = await webApi.getBookingSchedule(idMovie);
      setSchedules(result);
  }
    getDay();
    getMovie(); 
  }, []);

  useEffect(() => {
    if(day !== 'DEFAULT'){
      setCheckDay(true);

    }else{
      setCheckDay(false);

    }
}, [day]);
  const handleInputDay = (e) => {
    setDay(e.target.value);
  }
  const renderDay = () => {
    const listLichChieu = groupBy(
      schedules,
      "date"
    );

    let entries = Object.entries(listLichChieu);
    if(schedules.length > 0){
      return entries.map(([key, value], i) => {
          return (
            <option value={key} key={i}>
              {key}
            </option>
          );
      });   
    }
    return (
      <option disabled >
        vui lòng chọn phim khác
      </option>
    )
    
  }
  const date = new Date();
  const momenTime = moment(date).format("HH::mm::ss")
  const momenDay = moment(date).format("YYYY-MM-DD");

  const handlebooking = (id) => {
    history.push(`/booking/` + id);
  }
  const renderSchedule = () => {
    const listLichChieu = groupBy(
      schedules,
      "date"
    );

    let entries = Object.entries(listLichChieu);
    if(!checkDay){
      return(
        <div className="alert">
          <span>
            Mời chọn ngày

          </span>
        </div>
      );
    }
    if(schedules.length > 0){
      return entries.map(([key, value], i) => {
        if(key === day){
          return (
            <div key={i} className='schedule-item'>
              <div className='schedule-date'>
                {key}
              </div>
              <div className="schedule-time">
                <ul>
                  {value.map((data, i) => {
                    if(momenDay === data.date && data.time_start < momenTime){
                      return (
                        <li className='custom_time' key={i} onClick={() => handlebooking(data.id)}>
                          {data.time_start}
                        </li>
                      )
                    }else{
                      return (
                        <li className="custom_time" key={i} onClick={() => handlebooking(data.id)}>
                        {data.time_start}

                        </li>
                      )

                    }
                  })}
                </ul>
              </div>
              

            </div>
          );
        }
      });   
    }

  }

  
  return (

    <Fragment>
        <TicketOnline />
        <div className="BookingMovie-page">
            <div className="booking-wrapper">
              <div className="booking-header">
                <div className="select-item">
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
              </div>
              <div className="booking-content">
                <div className="content-item">
                  <div className="item-img">
                    <img src={poster} alt="load"/>
                  </div>
                  <div className="item-info">
                    <h3>{movie.title}</h3>
                    <div className="schedule-content">
                      { renderSchedule() }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </Fragment>
  )
}

export default BookingMovie
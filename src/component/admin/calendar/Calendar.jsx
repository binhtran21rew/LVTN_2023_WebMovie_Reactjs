import React,{useState, useEffect, useRef, useCallback} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import swal from "sweetalert";

import {Row, Col, Modal as ModalAnt, Switch} from 'antd';

import './calendar.scss';

// import {InputDefault as Input} from '../../../component/input/Input';
import { splitCalendar } from '../helper';

import {InputDefault as Input,InputRadio} from '../../../component/input/Input';
import Modal, { ModalContent } from '../../../component/modal/Modal';


import webApi, {getType, getMethod} from '../../../api/webApi'
import moment from 'moment'



const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const style = {
  background: '#0092ff',
  padding: '8px 0',
};
const movieType = [
  {
    id: 1,
    display: 'now_playing',
    status: 1
  },
  {
    id: 2,
    display: 'upcoming',
    status: 0
  }
]

function Calendar({...props}) {
    const [calendar, setCalendar] = useState([]);
    const [selectMovie, setSelectMovie] = useState('');
    const [selectNameMovie, setSelectNameMovie] = useState('');
    const [selectPriceMovie, setSelectPriceMovie] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priceWithTime, setPriceWithTime] = useState('');
    const [value, setValue] = useState({
      start: '',
      date:'',
    })
    const [editTable, setEditTable] = useState(false);
    const room_id = props.room_id.id;
    const date = splitCalendar(value.start)[0];
    const time_start = splitCalendar(value.start)[1];
    const [payload, setPayload] = useState(false);

    useEffect(() => {
      let mounted = true ;
      const scheduleDate = async () => {
        if(mounted){
          try{
            const result = await webApi.getSchedule(room_id);
            setCalendar(result);
          }catch(e){
    
          }
        }
      }

      scheduleDate();

      return () => {
        mounted = false;
      }
    }, [room_id]);

    
    useEffect(() => {
      const scheduleDate = async () => {
        try{
          const result = await webApi.getSchedule(room_id);
          setCalendar(result);
        }catch(e){
  
        }
      }

      scheduleDate();
      setPayload(false);
    }, [payload]);


    // Modal ==============================
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      handleSubmit();
      // setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    const resetValue = () => {
      setSelectMovie('');
      setSelectNameMovie('');
      setPriceWithTime('')
    }
    const handleSelect = (e) => {
      showModal();
      setValue({
        start: e.startStr,
        price: 0
      })

      resetValue();
    }
   //=====================================

    const handleInput = (e) =>{
      setValue({...value, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
      try{

          const data = {
            room_id: room_id,
            movie_id: selectMovie,
            date: date,
            price: priceWithTime,
            time_start: time_start
          }
          const result = await webApi.create(getType.Schedule, data);
          if(result.status === 200){
              swal('Success', result.message, 'success');
          }else{
              swal('Warning', result.message +  " \n date: "  +  result.data.date + " room: " + result.data.room
                  + "\n time_start: " + result.data.time_start + " time_end: " + result.data.time_end
              , 'warning')
          }

          resetValue();
          setPayload(true);
      }catch(e){

      }
    }
    const handleClickItem = (e) => {
        const modal = document.querySelector(`#modal_${e.event.id}_item`);
        modal.classList.toggle('active');
    }
    const handleShowMovie = async (e) => {
      e.preventDefault();
      const modal = document.querySelector(`#modal_${e.target.name}`);
      
      modal.classList.toggle('active');
    }



    const handleDropItem = async (e) => {
      const date = splitCalendar(e.event.startStr)[0];
      const time_start = splitCalendar(e.event.startStr)[1];
      var today = new Date();
      var strDate = 'Y-m-d'
        .replace('Y', today.getFullYear())
        .replace('m', today.getMonth()+1)
        .replace('d', today.getDate());
      if(e.event.extendedProps.dateNow >= strDate ){
        if(date > strDate){
          try{
            const data = {
              schedule_id: e.event.id,
              room_id: room_id,
              movie_id: e.event.extendedProps.id_movie,
              date: date,
              price: e.event.extendedProps.price,
              time_start: time_start
            }
            const result = await webApi.update(getType.Schedule, data);
            if(result.status === 200){
                swal('Success', result.message, 'success');
            }else{
                swal('Warning', result.message +  " \n date: "  +  result.data.date + " room: " + result.data.room
                    + "\n time_start: " + result.data.time_start + " time_end: " + result.data.time_end
                , 'warning')
            }
            setPayload(true);
          }catch(e){}
        }else{
          swal('Warning', 'Old times | Current date cannot be changed', 'warning' );
          setPayload(true);
        }
      }else{
        swal('Warning', 'Old date cannot be changed', 'warning' );
        setPayload(true);
      }


    }
    const onChange = (checked) => {
      setEditTable(!editTable);
    };
    const range = {
      'start': new Date()
    }

  return (
    <div className='Calendar'>
      <Row>
        <Col span={6}>
          <div className="header_calendar">
            <h1>
              {props.room_id.name && props.room_id.name}
            </h1>
            <div className="switch">
              <span>Edit</span>
              <Switch  onChange={onChange} />
            </div>
          </div>
        </Col>
        <Col span={24}>
          <FullCalendar
            initialView='timeGridWeek'
            plugins={[ dayGridPlugin,timeGridPlugin, interactionPlugin ]}
            headerToolbar={{
              left:"prev,next today",
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            selectable={true}
            select = {handleSelect}
            events={calendar}
            editable={editTable}
            eventClick={handleClickItem}
            eventDrop={handleDropItem}
            selectConstraint={ range }
            // selectAllow={range}
          />
          <ModalAnt title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <form onSubmit={handleSubmit} method='POST' id="form-submit-schedule">
              <div className="section mb-3">
                <label htmlFor="">Room</label>
                <div className="input_time">
                    <Input 
                        type='text'
                        name='room_id'
                        value={room_id}
                        readOnly={true}
                        onChange={handleInput}
                    />
                </div>
              </div>
              <div className="section mb-3">
                <label htmlFor="">Date</label>
                <div className="input_time">
                    <Input 
                        type='text'
                        name='date'
                        value={date}
                        readOnly={true}
                        onChange={handleInput}
                    />
                </div>
              </div>
              <div className="section mb-3">
                <label htmlFor="">Start</label>
                <div className="input_time">
                    <Input 
                        type='text'
                        name='time_start'
                        value={time_start}
                        readOnly={true}
                        onChange={handleInput}
                    />
                </div>
              </div>

              <div className="section mb-3 custom_movie">
                <label htmlFor="">Select movie:  <span>{selectNameMovie}</span></label>
                {
                  movieType.map(e => 
                    <input type='button'  value={e.display} name={e.status} onClick={handleShowMovie} key={e.id}/>
                )}
              </div>

              <div className="section mb-3">
                <label htmlFor="">Price</label>
                <div className="input_time">
                    <Input 
                        type='text'
                        name='price'
                        value={priceWithTime}
                        readOnly={true}
                        onChange={handleInput}
                    />
                </div>
              </div>

            </form>
            {
              movieType.map((item,i) => 
                <ModalTypeMovie  
                  key={i} 
                  item={item} 
                  setSelectMovie={setSelectMovie}
                  setSelectNameMovie={setSelectNameMovie}
                  setSelectPriceMovie={setSelectPriceMovie}
                  selectPriceMovie={selectPriceMovie}
                  time_start={time_start}
                  setPriceWithTime={setPriceWithTime}
                ></ModalTypeMovie>
            )}
          </ModalAnt>
        </Col>
        {
            calendar.map((item, i) => 
                <MovieItem  key={i} item={item}/>
            )
        }
      </Row>
      
    </div>
  )
}

const ModalTypeMovie = (props) => {
  const item = props.item;
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const load = async () => {
      const result = await webApi.getContentMovie(item.status);

      setMovies(result);
    }
    load()
  }, []);
  const selectMovie = (e) =>{
    movies.map(item => {
      if(item.id === parseInt(e.target.name)){
        props.setSelectPriceMovie(item.price)

        if(props.time_start >= '06:00:00' && props.time_start <= '11:30:00'){
          props.setPriceWithTime(Math.floor((item.price * 1.0)  / 1000) *1000)
    
        }else if(props.time_start >= '12:00:00' && props.time_start <= '17:30:00'){
          props.setPriceWithTime(Math.floor((item.price * 1.2)  / 1000) *1000)
    
        }else if(props.time_start >= '18:00:00' && props.time_start <= '23:30:00'){
          props.setPriceWithTime(Math.floor((item.price * 1.5)  / 1000) *1000) 
        }else{
          props.setPriceWithTime(Math.floor((item.price * 0.7)  / 1000) *1000)
        }
      }

    })

    props.setSelectMovie(e.target.name);
    props.setSelectNameMovie(e.target.value)



  }

  var render = '';
  if(movies.length > 0){
    render = movies.map((data, i) => {
      return (
            <Col className="gutter-row custom-col" span={6} key={i}>
              <input 
                  type='button'
                  value={data.title}
                  name={data.id}
                  onClick={selectMovie}
              />
            </Col>
      )
    })
  }
  return (
      <Modal active={false} id={`modal_${item.status}`}>
          <ModalContent className="mode__movie_content">
            <Row gutter={[16, 24]}>
              {render}
            </Row>
          </ModalContent>
      </Modal>
  )
}

const MovieItem = (props) => {
    const  item = props.item
    // const room_id = props.room_id.id;
    const date = splitCalendar(item.start)[0];
    const time_start = splitCalendar(item.start)[1];
    const time_end = splitCalendar(item.end)[1];

    return (
      <Modal active={false} id={`modal_${item.id}_item`}>
        <ModalContent className="mode__movie_content  custom-movieItem">
          <Row gutter={[16, 24]}>
              <ul>
                  <li>Phim: {item.title}</li>
                  <li>Date: {date}</li>
                  <li>Start: {time_start}</li>
                  <li>End: {time_end}</li>
              </ul>
          </Row>
        </ModalContent>
      </Modal>
    )
}
export default Calendar
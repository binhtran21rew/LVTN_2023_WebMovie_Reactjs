import React, {useState, useEffect, useRef} from 'react'
import {Link, useParams } from 'react-router-dom';
import Draggable, {DraggableCore} from "react-draggable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";


import './changeroom.scss';

import Button from '../../../../component/button/Button';
import webApi, { getMethod, getType } from '../../../../api/webApi';
const ChangeRoom = () => {
  const nodeRef = React.useRef(null);
  const {id} = useParams();
  const [listSeat, setListSeat] = useState([]);
  const [payload, setPayload] = useState(false);
  const [listChange, setListChange] = useState([]);
  useEffect(() => {
    var mouted = true;
    const getList = async () => {
      if(mouted){
        const result = await webApi.getId(getType.Room, id)
        setListSeat(result.data);
      }
    }

    getList();
    return () => {
      mouted = false;
    }
  }, [id]);
  useEffect(() => {
    var mouted = true;
    const getList = async () => {
      if(mouted){
        const result = await webApi.getId(getType.Room, id)
        setListSeat(result.data);
      }
    }

    getList();
    return () => {
      setPayload(false);
      mouted = false;
    }
  }, [payload]);
  const eventHandler = (e, data, seat_id) => {
    setListChange({...listChange, [seat_id]: data.lastX +',' + data.lastY})
  }
  const renderSeat = () => {
    return listSeat.seat?.map((seat, i) => {
      const x = parseInt(seat.position?.split(',')[0]);
      const y = parseInt(seat.position?.split(',')[1]);

      if(seat.position !== null){
        return (
          <Draggable key={i} nodeRef={nodeRef} onStop={(e, data) => eventHandler(e, data, seat.id)} defaultPosition={{x: x, y: y}}>
            <div  className='item_seat ' ref={nodeRef}>
              <FontAwesomeIcon icon={faCouch}  className={`slot__item item_seat`}></FontAwesomeIcon>
              <span className='number_seat'> 
                {seat.number}
              </span>
            </div>
          </Draggable>
        )
      }else{
        return (
          <Draggable key={i} nodeRef={nodeRef} onStop={(e, data) => eventHandler(e, data, seat.id)}>
            <div  className='item_seat ' ref={nodeRef}>
              <FontAwesomeIcon icon={faCouch}  className={`slot__item item_seat`}></FontAwesomeIcon>
              <span className='number_seat'> 
                {seat.number}
              </span>
            </div>
          </Draggable>
        )
      }
    })
  }

  const handleReset = () => {
    setPayload(true);
    setListSeat([])
    setListChange([]);
  }
  const handleChange = async() =>{
    try{
      const param = {
        'seats[]': listChange
      }
      const result = await webApi.changeRoom(param); 
      if(result.status === 200){
        swal('Success', result.message, 'success');
        handleReset();
      }else{
        swal('Error', result.message, 'error');

      }
    }catch(e){}
  }

  return (
    <div className='ChangeRoom-page'>
      <div className="ChangeRoom__header">
        <div>
          <span>Schema Seat</span>
          <div className='link_food'>
            <div className='LinkTo'>
              <Link to={`/admin/list_room/rooms`}>go to list room </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ChangeRoom-wrapper">
        <div className="schema_room">
          <div className="screen"></div>
          <div className="slot__seat">
            <div className="slot__row">
                {renderSeat()}
            </div>
          </div>
        </div>
        <div className="button">
          <Button 
              className={"ticket-btn"}
              onClick={handleReset}
              disabled={false}
          >Reset</Button>
          <Button 
              className={"ticket-btn"}
              onClick={handleChange}
              disabled={Object.keys(listChange).length === 0}
          >Cập nhật</Button>
        </div>
      </div>
    </div>
  )
}

export default ChangeRoom
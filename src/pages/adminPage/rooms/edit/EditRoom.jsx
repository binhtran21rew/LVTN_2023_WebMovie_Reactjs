import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { Radio } from 'antd';

import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';

import webApi, {getType} from '../../../../api/webApi';
const EditRoom = () => {
    const optionStatus = [
        {
            display: 'Avaialble',
            status: 0
        },
        {
            display: 'Close',
            status: 1
        },
    ];
    
    const location = useLocation();
    const data = location.state.data;
    const [checkBox, setCheckBox] = useState(data.status)
    const [inputRoom, setInputRoom] = useState({
        name: data.name_room,
        number_seat: data.number_seat,
    });
    const handleInput = (e) =>{
        setInputRoom({...inputRoom, [e.target.name]: e.target.value})

    }
    const handleCheck = (e) => {
        setCheckBox(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const dataRoom = new FormData();
            dataRoom.append('id', data.id);
            dataRoom.append('name', inputRoom.name);
            dataRoom.append('number_seat', inputRoom.number_seat);
            dataRoom.append('status', checkBox);

            const result = await webApi.update(getType.Room, dataRoom)
            if(result.status === 200){
                swal('Success',"Create movie success", 'success')
            }else{
                swal('Error',"sai", 'error')
            }


        }catch(e){
            
        }
    }
    return (
        <div className="Room-form">
        <form onSubmit={handleSubmit}>
            <div className="section mb-3">
                <label htmlFor="">Room name:</label>
                <div className="input_title">
                    <Input 
                        placeholder='Input room name...'
                        type='text'
                        name='name'
                        onChange={handleInput}
                        value={inputRoom.name}
                    />
                </div>
            </div>
            <div className="section mb-3">
                <label htmlFor="">Number of Seats: </label>
                <div className="input_title">
                    <Input 
                        placeholder='Input number...'
                        type='number'
                        name='number_seat'
                        min="1"
                        onChange={handleInput}
                        value={inputRoom.number_seat}
                        disabled={true}
                    />

                </div>
            </div>

            <div className="section mb-3">
                <label htmlFor="">Status</label>
                <div className="input_status">
                    <Radio.Group onChange={handleCheck} value={checkBox} name='status'>
                    {optionStatus.map( (item, i) => (
                        <div className="status_item" key={i}>
                            <Radio value={item.status} >{item.display}</Radio>
                        </div>
                    ))}
                    </Radio.Group>
                    
                </div>
            </div>
            <Button className="movie_btn_create">Create</Button>
            
        </form>
    </div>
    )
}

export default EditRoom
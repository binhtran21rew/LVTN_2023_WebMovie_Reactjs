import React, {useState, useEffect} from 'react';
import swal from "sweetalert";


import './room.scss';

import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';

import webApi, {getType} from '../../../../api/webApi';
const Rooms = () =>{


    const [roomInput, setRoomInput] = useState({
        name: '',
        number_seat: ''
    });

    const handleInput = (e) => {
        setRoomInput({...roomInput, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = {
                name: roomInput.name,
                number_seat: roomInput.number_seat
            }
            const result = await webApi.create(getType.Room, data);
            if(result.status === 200){
                swal('Success', result.message, 'success')
                setRoomInput('');
            }else{
                swal('Warning', result.message, 'warning')

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
                            value={roomInput.name}
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
                            value={roomInput.number_seat}
                        />
                    </div>
                </div>
                <Button className="movie_btn_create">Create</Button>
                
            </form>
        </div>
    )
}

export default Rooms;
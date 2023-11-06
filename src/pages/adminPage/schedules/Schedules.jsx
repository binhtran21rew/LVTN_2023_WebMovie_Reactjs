import React, {useState, useEffect} from 'react';
import swal from "sweetalert";

import './schedule.scss';

import {InputDefault as Input} from '../../../component/input/Input';
import Button from '../../../component/button/Button';
import SelectOptionCasts from '../../../component/admin/SelectOption';

import webApi from '../../../api/webApi';
const Schedules = ({list}) => {
    const [movie, setMovie] = useState([]);
    const [room, setRoom] = useState([]);
    const [scheduleInput, setScheduleInput] = useState({
        room_id: '',
        movie_id: '',
        date:'',
        time_start: '',
        price: ''
    });


    useEffect(() => {
        const roomData = async () => {
            const result = await webApi.getAllRoom();
            setRoom(result);
        }
        const movieData = async () => {
            const result = await webApi.getAllMovies();
            setMovie(result);
        }
        roomData();
        movieData();
    }, []);

    const handleInput = (e) => {
        setScheduleInput({...scheduleInput, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const form = document.getElementById('form-submit-schedule')
            const data = new FormData(form);
            const result = await webApi.createSchedule(data);
            if(result.status === 200){
                swal('Success', result.message, 'success');
            }else{
                swal('Warning', result.message +  " \n date: "  +  result.data.date + " room: " + result.data.room
                    + "\n time_start: " + result.data.time_start + " time_end: " + result.data.time_end
                , 'warning')
            }
        }catch(e){

        }
    }
    return (
        <div className="Schedule-page">
            <form onSubmit={handleSubmit} method='POST' id="form-submit-schedule">
                <div className="schedule__wrapper">
                    <div className="section mb-3">
                        <label htmlFor="">Select Date show:</label>
                        <div className="input_date">
                            <Input 
                                type='date'
                                name='date'
                                onChange={handleInput}
                                value={scheduleInput.date}
                            />
                        </div>
                    </div>
                    <div className="section mb-3">
                        <label htmlFor="">Select time start:</label>
                        <div className="input_time">
                            <Input 
                                type='time'
                                name='time_start'
                                onChange={handleInput}
                                value={scheduleInput.time_start}
                            />
                        </div>
                    </div>
                    <div className="section mb-3">
                        <label htmlFor="">Input price</label>
                        <div className="input_time">
                            <Input 
                                type='number'
                                name='price'
                                onChange={handleInput}
                                value={scheduleInput.price}
                            />
                        </div>
                    </div>
                    <div className="section mb-3">
                        <label htmlFor="">Select room:</label>
                        <SelectOptionCasts 
                            data= {room} 
                            name="room_id"
                            placeholder="Select room..."
                            isMulti={false}
                        />
                    </div>
                    <div className="section mb-3">
                        <label htmlFor="">Select movie:</label>
                        <SelectOptionCasts 
                            data= {movie} 
                            name="movie_id"
                            placeholder="Select room..."
                            isMulti={false}
                        />
                    </div>
                    <Button className="movie_btn_create">Create</Button>
                </div>
            </form>
        </div>
    )
}

export default Schedules;
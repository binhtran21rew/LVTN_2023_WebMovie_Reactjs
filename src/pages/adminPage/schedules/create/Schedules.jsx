import React, {useState, useEffect} from 'react';
import swal from "sweetalert";

import './schedule.scss';
import AsyncSelect from 'react-select/async';

import webApi, {getType, getMethod} from '../../../../api/webApi';
import Calendar from '../../../../component/admin/calendar/Calendar';

const Schedules = () => {
    const [room, setRoom] = useState([]);
    const [selectValue, setSelectValue] = useState(null)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const roomData = async () => {
            const result = await webApi.getAvailableRoom();
            setRoom(result);
        }
        roomData();
    }, []);

    const handleChange = (selectOption) => {
        setSelectValue(selectOption);
        setShowModal(true);
    }
    const filterOptions = (inputValue) => {
        return room.filter((i) =>  (i.title||i.name).toLowerCase() .includes(inputValue.toLowerCase()))
    }
    const loadOption = (searchValue, callback) =>{
        if(searchValue){
            setTimeout(() => {
                callback(filterOptions(searchValue));
            },2000)
        }
    }
    const setStyle = {
        control: (styles) => ({...styles, backgroundColor: "white"}),
        option: (styles) => {
            return {...styles, color: 'black'}
        }
    }


    let show = '';
    if(showModal) {
        show = <Calendar room_id = {selectValue}/>;
    }
    return (
        <div className="Schedule-page">
            <div className="section mb-3 selectRoom">
                <label htmlFor="">Select room:</label>
                <AsyncSelect 
                    cacheOptions={false}
                    defaultOptions
                    value={selectValue}
                    getOptionLabel={e => e.name||e.title}
                    getOptionValue={e => e.id}
                    loadOptions={loadOption} 
                    onChange={handleChange} 
                    name="room_id"
                    placeholder="Select room..."
                    styles={setStyle}
                    isClearable
                    
                />
                {show && show}
            </div>

        </div>
    )
}

export default Schedules;
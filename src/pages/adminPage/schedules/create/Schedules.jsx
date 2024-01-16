import React, {useState, useEffect} from 'react';
import swal from "sweetalert";

import './schedule.scss';
import AsyncSelect from 'react-select/async';

import webApi, {getType, getMethod} from '../../../../api/webApi';
import Calendar from '../../../../component/admin/calendar/Calendar';
import { Select, Space } from 'antd';


const Schedules = () => {
    const [room, setRoom] = useState([]);
    const [selectValue, setSelectValue] = useState(null)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const roomData = async () => {
            try{
                const result = await webApi.getAvailableRoom();
                setRoom(result);
            }catch(e){
      
            }
        }
        roomData();
    }, []);
    
    var options = []
    room.map((data) => options.push({
        value: data.id,
        label: data.name
    }))
    const handleChange = (value, room) => {
        const data = room.find((data) => data.id === value);
        setSelectValue({
            id: data.id,
            name: data.name
        });
        setShowModal(true);
    };
    const onSearch = (value) => {};
    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    let show = '';
    if(showModal) {
        show = <Calendar room_id = {selectValue}/>;
    }
    return (
        <div className="Schedule-page">
            <div className="section mb-3 selectRoom">
                <label htmlFor="">Select room:</label>
                <Select
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    showSearch
                    placeholder="Select room..."
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    onChange={(value) => handleChange(value, room)}
                    options={options}
                />
                {show && show}
            </div>

        </div>
    )
}

export default Schedules;
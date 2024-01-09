import React, {useState, useEffect} from 'react';
import { Chart as Chartjs} from 'chart.js/auto';
import { Bar, Doughnut, Line} from 'react-chartjs-2';
import {Link, useParams } from 'react-router-dom';
import moment from 'moment'
import { Select, DatePicker, Space, TimePicker} from 'antd';

import './chartdata.scss';

import {optionChart,  optionChartWithTime} from '../../../../component/content/Content';
import webApi from '../../../../api/webApi';
const ChartData = () => {
    const { Option } = Select;
    const [listData, setListData] = useState([]);

    const [dataName, setDataName] = useState([]);
    const [dataPrice, setDataPrice] = useState([]);
    const [filter, setFilter] = useState('movie');
    const [filterTime, setFilterTime] = useState('all');
    const [filterTimeCustom, setFilterTimeCustom] = useState('');
    const [type, setType] = useState('date');


    const [loading, setLoading] = useState(false);
    const [mount, setMount] = useState(false);
    useEffect(() => {
        let mounted = true;
        if(mounted){
            const param ={
                filter,
                filterTime,
                filterTimeCustom
            }
            const getdata = async () => {
                if(filterTime !== 'input'){
                    const result = await webApi.getChartData(param);
                    setListData(result);
                    setMount(true)
                }
            }
            getdata();
        }
        return () => {
            mounted = false;
        }
    }, [filter, filterTime]);
    useEffect(() => {
        let mounted = true;
        if(mounted){
            const param ={
                filter,
                filterTime,
                filterTimeCustom:  type + '/' + filterTimeCustom
            }
            const getdata = async () => {
                if(filterTime === 'input'){
                    const result = await webApi.getChartData(param);
                    setListData(result);
                    setMount(true)
                }
            }
            getdata();
        }
        return () => {
            mounted = false;
        }
    }, [filterTime, filterTimeCustom]);
    useEffect(() => {
        if(mount){
            if(filter === 'total_price') {
                if(filterTime === 'day'){
                    setDataName(listData?.reduce((result, current) => {
                        (
                            result[current.date] = result[current.date] || []
                        ).push(current.total_price);
                            return result;
                    }, {}))

                }else if(filterTime === 'month'){
                    setDataName(listData?.reduce((result, current) => {
                        (
                            result[moment(current.date).format('M')] = result[moment(current.date).format('M')] || []
                        ).push(current.total_price);
                            return result;
                    }, {}))
                }
                setLoading(true);
    
            }else if(filter === 'movie'){

                setDataName(listData?.reduce((result, current) => {
                    (
                        result[current.ticket[0]?.schedule?.movie.title] = result[current.ticket[0]?.schedule?.movie.title] || []
                    ).push(current.total_price);
                        return result;
                }, {}))
                setLoading(true);
            }else if(filter === 'room'){
                setDataName(listData?.reduce((result, current) => {
                    (
                        result[current.ticket[0]?.schedule?.room.name] = result[current.ticket[0]?.schedule?.room.name] || []
                    ).push(current.total_price);
                        return result;
                }, {}))
                setLoading(true);
            }
        }
        return () => {
            setMount(false);
        }
    }, [mount]);

    useEffect(() => {
        if(loading){
            const array = {}
            for(var key in dataName){
                array[key] = dataName[key].reduce((result, current) => result + current, 0)
            }
            setDataPrice(array)
        }

        return () => {
            setLoading(false);
        }
    }, [loading]);
    const handleChangeFilter = (value) =>{
        setFilter(value)
    }

    const handleChangeFilterWithTime = (value) => {
        setFilterTime(value)
    }
    const PickerWithType = ({ type, onChange }) => {
        if (type === 'date') return <DatePicker onChange={onChange} />;
        return <DatePicker picker={type} onChange={onChange} />;
    };
    const handleFilterCustom = (value) => {
        if(type === 'date'){
            setFilterTimeCustom(moment(value.$d).format('YYYY-MM-DD'))
        }else if(type === 'month'){
            setFilterTimeCustom(moment(value.$d).format('YYYY-MM'))
        }else{
            setFilterTimeCustom(moment(value.$d).format('YYYY'))
        }
    }

    const showData = () => {
        if(filterTime === 'input'){
            return (
                <Bar 
                    data={{
                        labels:  Object.entries(dataName).map(([key, value]) => key.toUpperCase()),
                        datasets: [
                            {
                                label: filter.toUpperCase() + ' - With ' +  filterTimeCustom,
                                data: Object.entries(dataPrice).map(([key, value]) => value)
                            }
                        ]
                    }}
                />
            )
        }else{
            return (
                <Bar 
                    data={{
                        labels:  Object.entries(dataName).map(([key, value]) => key.toUpperCase()),
                        datasets: [
                            {
                                label: filter.toUpperCase() + ' - With CURRENT ' + filterTime.toUpperCase(),
                                data: Object.entries(dataPrice).map(([key, value]) => value)
                            }
                        ]
                    }}
                />
            )
        }
    }
    return (
        <div className='Admin-catalog chart-data'>
            <div className="Catalog">
                <div className="Catalog__header">
                    <span>statistics Booking</span>
                    <div className="link_custom">
                        <div className='LinkTo'>
                            <Link to={`/admin/bookings/list_booking`}>go to list booking</Link>
                        </div>
                    </div>

                </div>
                <div className="Catalog__body">
                    <div className="page-header">
                        <Select
                            defaultValue="With Price"
                            style={{ width: 120 }}
                            onChange={handleChangeFilter}
                            options={optionChart}
                            className='select-custom'
                        />
                        <Select
                            defaultValue="Option With Time"
                            style={{ width: 200, margin: 25 }}
                            onChange={handleChangeFilterWithTime}
                            options={ optionChartWithTime}
                            className='select-custom'
                        />

                        <Select value={type} onChange={type} disabled={filterTime === 'input' ? false : true}> 
                            <Option value="date">Date</Option>
                            <Option value="month">Month</Option>
                            <Option value="year">Year</Option>
                        </Select>
                        {filterTime === 'input' ? (
                            <PickerWithType type={type} onChange={handleFilterCustom}/>

                        ): ''}
                    </div>
                    {showData()}
                </div>
            </div>
        </div>
    )
}

export default ChartData
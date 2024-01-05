import React, {useState, useEffect} from 'react';
import { Chart as Chartjs} from 'chart.js/auto';
import { Bar, Doughnut, Line} from 'react-chartjs-2';
import {Link, useParams } from 'react-router-dom';
import moment from 'moment'
import { Select} from 'antd';

import './chartdata.scss';

import {optionChart} from '../../../../component/content/Content';
import webApi from '../../../../api/webApi';
const ChartData = () => {
    const [listData, setListData] = useState([]);

    const [dataName, setDataName] = useState([]);
    const [dataPrice, setDataPrice] = useState([]);
    const [filter, setFilter] = useState('movie');
    const [loading, setLoading] = useState(false);
    const [mount, setMount] = useState(false);
    useEffect(() => {
        let mounted = true;
        if(mounted){

            const param ={
                filter
            }
            const getdata = async () => {
                const result = await webApi.getChartData(param);
                setListData(result);
                setMount(true)
            }
            getdata();
        }
        return () => {
            mounted = false;
        }
    }, [filter]);

    useEffect(() => {
        if(mount){
            if(filter === 'total_price') {
                setDataName(listData?.reduce((result, current) => {
                    (
                        result[moment(current.date).format('M')] = result[moment(current.date).format('M')] || []
                    ).push(current.total_price);
                        return result;
                }, {}))
                setLoading(true);
    
            }else if(filter === 'movie'){

                setDataName(listData?.reduce((result, current) => {
                    console.log(current.ticket[0]?.schedule?.movie.title, current.id);
                    (
                        result[current.ticket[0]?.schedule?.movie.title] = result[current.ticket[0]?.schedule?.movie.title] || []
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
                            defaultValue="Filter"
                            style={{ width: 120 }}
                            onChange={handleChangeFilter}
                            options={optionChart}
                            className='select-custom'
                        />
                    </div>
                    <Bar 
                        data={{
                            labels:  Object.entries(dataName).map(([key, value]) => key),
                            datasets: [
                                {
                                    label: filter,
                                    data: Object.entries(dataPrice).map(([key, value]) => value)
                                }
                            ]
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChartData
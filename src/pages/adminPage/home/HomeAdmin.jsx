import React, {useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';


import './admin-home.scss';

import Card from '../../../component/admin/card/Card';
import Modal, { ModalContent } from '../../../component/modal/Modal';
import webApi, { getType } from '../../../api/webApi';
import axios from 'axios';

const HomeAdmin = () => {
    const [accounts, setAccounts] = useState('');
    const [movies, setMovies] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [schedulesDetail, setSchedulesDetail] = useState([]);
    useEffect(() => {
        let mounted = true;
        const getUser = async () =>{
            if(mounted){

                const resultAccount = await webApi.getDashboard(getType.Account) ;
                const resultMovie = await webApi.getDashboard(getType.Movie) ;
                const restuleSchedule = await webApi.getDashboard(getType.Schedule);
                setAccounts(resultAccount.length);
                setMovies(resultMovie);
                setSchedules(restuleSchedule);
                setSchedulesDetail(restuleSchedule.reduce((result, current) => 
                    {
                        (result[current.room.name] = result[current.room.name] || []).push(current) 
    
                        return result;
                    },{}
                ))
            }
        }

        getUser();

        return () => {
            mounted = false;
        }
    }, []);
    const hanldeShowSchedule = () => {
        const modal = document.getElementById('modal_dashboard_schedule');
        modal.classList.toggle('active');
    }
    return (
        <div className='Admin-home'>
            <div className="Home-wrapper">
                <div className="block-overview">
                    <Card 
                        number={accounts} 
                        title={"total Customer"}
                        bgColor="bg-info"
                        linkTo='/admin/list_account/accounts'
                        svg={<svg width="61" height="61" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#c4c4c4" d="M15.989 19.129C16 17 13.803 15.74 11.672 14.822c-2.123-.914-2.801-1.684-2.801-3.334c0-.989.648-.667.932-2.481c.12-.752.692-.012.802-1.729c0-.684-.313-.854-.313-.854s.159-1.013.221-1.793c.064-.817-.398-2.56-2.301-3.095c-.332-.341-.557-.882.467-1.424c-2.24-.104-2.761 1.068-3.954 1.93c-1.015.756-1.289 1.953-1.24 2.59c.065.78.223 1.793.223 1.793s-.314.17-.314.854c.11 1.718.684.977.803 1.729c.284 1.814.933 1.492.933 2.481c0 1.65-.212 2.21-2.336 3.124C.663 15.53 0 17 .011 19.129C.014 19.766 0 20 0 20h16s-.014-.234-.011-.871M17 10V7h-2v3h-3v2h3v3h2v-3h3v-2z"></path>
                        </svg>}
                    />
                    <Card 
                        number={movies} 
                        title={"Movies"}
                        bgColor="bg-info"
                        linkTo='/admin/list_movie/movies'
                        svg={<svg width="61" height="61" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#c4c4c4" d="M960 128H850q81 72 127.5 171.5T1024 512q0 104-40.5 199t-109 163.5t-163.5 109t-199 40.5t-199-40.5t-163.5-109T40.5 711T0 512t40.5-199t109-163.5T313 40.5T512 0h448q26 0 45 19t19 45.5t-19 45t-45 18.5M192 384q-53 0-90.5 37.5T64 512t37.5 90.5T192 640t90.5-37.5T320 512t-37.5-90.5T192 384M512 64q-53 0-90.5 37.5T384 192t37.5 90.5T512 320t90.5-37.5T640 192t-37.5-90.5T512 64m-64 448q0 27 18.5 45.5t45 18.5t45.5-18.5t19-45.5t-19-45.5t-45.5-18.5t-45 18.5T448 512m64 192q-53 0-90.5 37.5T384 832t37.5 90.5T512 960t90.5-37.5T640 832t-37.5-90.5T512 704m192-192q0 53 37.5 90.5T832 640t90.5-37.5T960 512t-37.5-90.5T832 384t-90.5 37.5T704 512"/>
                        </svg>}
                    />
                    <Card 
                        number={schedules.length} 
                        detail={true}
                        title={"schedules available"}
                        bgColor="bg-info"
                        linkTo='/admin/list_movie/movies'
                        onClick={hanldeShowSchedule}
                        svg={<svg width="70" height="70" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#c4c4c4" d="M37 38H13c-1.7 0-3-1.3-3-3V13c0-1.7 1.1-3 2.5-3H14v2h-1.5c-.2 0-.5.4-.5 1v22c0 .6.4 1 1 1h24c.6 0 1-.4 1-1V13c0-.6-.3-1-.5-1H36v-2h1.5c1.4 0 2.5 1.3 2.5 3v22c0 1.7-1.3 3-3 3"/>
                            <path fill="#c4c4c4" d="M17 14c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1m16 0c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1m-13-4h10v2H20zm-8 6h26v2H12zm22 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm16 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm20 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm16 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2z"/>
                        </svg>}
                    />
                </div>

            </div>
            {<ModalSchedule data={schedulesDetail}/>}
        </div>

    )
}

const ModalSchedule = (props) => {
    const list = Object.entries(props.data);
    const render = (
        list.map(([key, value], i) => {
            return (
                <table key={i} className='item-schedule'>
                    <thead>
                        <tr>
                            <th>room</th>
                            <th>date</th>
                            <th>time start</th>
                            <th>time end</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{key}</td>
                        <td>
                            {value.map((item,i) => {
                                return (
                                    <div key={i}>
                                        {item.date}
                                    </div>
                                )
                            })}
                        </td>
                        <td>
                            {value.map((item,i) => {
                                return (
                                    <div key={i}>
                                        {item.time_start}
                                    </div>
                                )
                            })}
                        </td>
                        <td>
                            {value.map((item,i) => {
                                return (
                                    <div key={i}>
                                        {item.time_end}
                                    </div>
                                )
                            })}
                        </td>
                    </tr>
                    </tbody>
                </table> 

            )
        })
    )
    return(
        <Modal active={false} id={`modal_dashboard_schedule`}>
            <ModalContent className="dashboard_schedule">
                <div className="table_movie">
                    <section className="table__body" >
                        {render}
                    </section>
                </div>
                <Link className='linkTo' to={'/admin/schedules/list_schedule'}>go to schedule</Link>
            </ModalContent>
        </Modal>
    )
}

export default HomeAdmin;
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


import webApi from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListSchedule = () => {
    // const [loading ,setLoading] = useState(true);
    // const [schedule, setSchedule] = useState([]);

    // useEffect(() => {
    //     const loadSchedule = async () => {
    //         const result = await webApi.getAllSchedule();
    //         setSchedule(result)
    //         setLoading(false);
    //     }

    //     loadSchedule();
    // }, []);
    // const [itemPage, setItemPage] = useState(0);
    // const itemPerPge = 5;

    // const endPage = itemPage + itemPerPge;
    // const currentItems = schedule.slice(itemPage, endPage);
    // const pageCount = Math.ceil(schedule.length / itemPerPge);

    // const handleClick = (e) => {
    //     const newPage = (e.selected * itemPerPge)  % schedule.length;
    //     setItemPage(newPage);
    // }
    // var viewDisplay = '';
    // if(loading){
    //     return (
    //         <h4>Loading...</h4>
    //     )
    // }else{
    //     viewDisplay = currentItems.map((data, i) => {
    //         return (
    //             <tr key={i}>
    //                 <td>{data.id}</td>
    //                 <td>{data.room}</td>
    //                 <td>{data.movie}</td>
    //                 <td>{data.date}</td>
    //                 <td>{data.time_start}</td>
    //                 <td>{data.time_end}</td>
    //                 <td>{data.price}</td>
    //                 <td>
    //                     <button >
    //                         <FontAwesomeIcon icon={faPenToSquare} className='movie-icon'/>
    //                     </button>

    //                     <button>
    //                         <FontAwesomeIcon icon={faTrash} className='movie-icon'/>
    //                     </button>
    //                 </td>

    //             </tr>
    //         )
    //     })
    // }
    return (
        <div className="ListSchedule-page">
            {/* <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>room</th>
                                <th>movie</th>
                                <th>date</th>
                                <th>time start</th>
                                <th>time end</th>
                                <th>price</th>
                                <th>option</th>

                            </tr>
                        </thead>
                        <tbody>
                           {viewDisplay}
                        </tbody>
                    </table>
                    <PaginationItem handleClick={handleClick} pageCount={pageCount}/> 

                </section>
            </div> */}
        </div>
    )
} 

export default ListSchedule;

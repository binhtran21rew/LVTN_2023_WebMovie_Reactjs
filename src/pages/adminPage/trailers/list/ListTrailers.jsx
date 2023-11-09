import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import './listtrailer.scss';

import webApi from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListTrailers = () => {

    const [loading ,setLoading] = useState(true);
    const [trailers, setTrailers] = useState([]);

    useEffect(() => {
        const loadTrailer = async () => {
            const result = await webApi.getAllTrailers();
            setTrailers(result)
            setLoading(false);
        }

        loadTrailer();
    }, []);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems =trailers.slice(itemPage, endPage);
    const pageCount = Math.ceil(trailers.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % trailers.length;
        setItemPage(newPage);
    }

    var viewDisplay = '';
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        viewDisplay = currentItems.map((data, i) => {
            return (
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.name_movie}</td>
                    <td>{data.key}</td>
                    <td>
                        <button >
                            <FontAwesomeIcon icon={faPenToSquare} className='movie-icon'/>
                        </button>

                        <button>
                            <FontAwesomeIcon icon={faTrash} className='movie-icon'/>
                        </button>
                    </td>

                </tr>
            )
        })
    }
    return (
        <div className="ListTrailer-page">
             <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name movie</th>
                                <th>key video</th>
                                <th>option</th>
                            </tr>
                        </thead>
                        <tbody>
                           {viewDisplay}
                        </tbody>
                    </table>
                    <PaginationItem handleClick={handleClick} pageCount={pageCount}/> 

                </section>
            </div>
        </div>
        
    )
}


export default ListTrailers;
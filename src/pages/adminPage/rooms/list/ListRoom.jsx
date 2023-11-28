import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';



import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListRoom = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [Rooms, setRooms] = useState([]);

    useEffect(() => {
        const loadTrailer = async () => {
            const result = await webApi.getAll(getType.Room, getMethod.getAll);
            setRooms(result)
            setLoading(false);
        }

        loadTrailer();
    }, []);
    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems = Rooms.slice(itemPage, endPage);
    const pageCount = Math.ceil(Rooms.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % Rooms.length;
        setItemPage(newPage);
    }
    const handleEdit = (id) => {
        const data = Rooms.find((data) => data.id === id)
        history.push({
            pathname: '/admin/detail/room/'+ id,
            state: {data: data}
        });
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
                    <td>{data.name_room}</td>
                    <td>{data.number_seat}</td>

                    <td>
                        <button >
                            <FontAwesomeIcon icon={faPenToSquare} className='movie-icon' onClick={() => handleEdit(data.id)}/>
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
        <div className="ListRoom-page">
             <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name room</th>
                                <th>number of seat</th>
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


export default ListRoom;
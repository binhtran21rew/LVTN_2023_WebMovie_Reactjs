import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";


import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const ListRoom = () => {
    const history = useHistory();
    const [loading ,setLoading] = useState(true);
    const [Rooms, setRooms] = useState([]);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const loadTrailer = async () => {
            const result = await webApi.getAll(getType.Room, getMethod.getAll);
            setRooms(result)
            setLoading(false);
        }

        loadTrailer();
    }, []);

    useEffect(() => {
        const loadTrailer = async () => {
            const result = await webApi.getAll(getType.Room, getMethod.getAll);
            setRooms(result)
            setLoading(false);
        }

        loadTrailer();
        setPayload(false);
    }, [payload]);
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
    const handleDelete = async (id) => {
        const param = {
            id,
            type: 'softDelete'
        }
        swal({
            title: "Are you sure?",
            text: "Restore your data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
              const result = await webApi.delete(getType.Room, param);
              if(result.status === 200){
                swal(result.message, {
                  icon: "success",
                });
                setPayload(true);
              }else{
                  swal('Error',result.message, 'error')
              }
            } else {
            }
          });
    }
    var viewDisplay = '';
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        if(currentItems.length > 0){
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
                                <FontAwesomeIcon icon={faTrash} className='movie-icon' onClick={() => handleDelete(data.id)}/>
                            </button>
                        </td>
    
                    </tr>
                )
            })
        }else{
            viewDisplay = (
                <tr className='nodata'>
                    <td colSpan={4}> No data in here!</td>
                </tr>
            )
        }
    
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

            <Link className='trash' to="/admin/room_Trashed/room">go to trash storage</Link>

        </div>
        
    )
}


export default ListRoom;
import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";


import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';

const GarbageRoom = () => {
  const history = useHistory();
  const [loading ,setLoading] = useState(true);
  const [Rooms, setRooms] = useState([]);
  const [payload, setPayload] = useState(false);

  useEffect(() => {
      const loadTrailer = async () => {
        try{
            const result = await webApi.getTrashed(getType.Room);
            setRooms(result)
            setLoading(false);
        }catch(e){
  
        }
      }

      loadTrailer();
  }, []);

  useEffect(() => {
      const loadTrailer = async () => {
        try{
            const result = await webApi.getTrashed(getType.Room);
            setRooms(result)
            setLoading(false);
        }catch(e){
  
        }
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
  const handleRestore = (id) => {
    const param = {
      id,
      type: 'restore',
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
  const handleDelete = async (id) => {
      const param = {
          id,
          type: 'delete'
      }
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
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
                              <FontAwesomeIcon icon={faRotateRight} className='movie-icon' onClick={() => handleRestore(data.id)}/>
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


      </div>
      
  )
}

export default GarbageRoom
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';


import swal from "sweetalert";



import webApi, {getType, getMethod} from '../../../../api/webApi';
import PaginationItem from '../../../../component/pagination/Pagination';
const GarbageCast = () => {

    const [loading ,setLoading] = useState(true);
    const [casts, setCasts] = useState([]);
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        const loadCast = async () => {
            try{
                const result = await webApi.getTrashed(getType.Cast);
                setCasts(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadCast();
    }, []);

    useEffect(() => {
        const loadCast = async () => {
            try{
                const result = await webApi.getTrashed(getType.Cast);
                setCasts(result)
                setLoading(false);
            }catch(e){
      
            }
        }

        loadCast();
        setPayload(false)
    }, [payload]);

    const [itemPage, setItemPage] = useState(0);
    const itemPerPge = 5;

    const endPage = itemPage + itemPerPge;
    const currentItems =casts?.slice(itemPage, endPage);
    const pageCount = Math.ceil(casts.length / itemPerPge);

    const handleClick = (e) => {
        const newPage = (e.selected * itemPerPge)  % casts.length;
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
            const result = await webApi.delete(getType.Cast, param);
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
            type: 'delete',
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
              const result = await webApi.delete(getType.Cast, param);
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
                        <td>{data.name}</td>
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
                    <td colSpan={3}> No data in here!</td>
                </tr>
            )
        }
    }
    return (
        <div className="ListCast-page">
             <div className="table_movie">
                <section className="table__body" >
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name cast</th>
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

export default GarbageCast
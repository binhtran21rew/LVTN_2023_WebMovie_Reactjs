import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import swal from "sweetalert";



import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import webApi, { getType } from '../../../../api/webApi';
const EditTrailer = () => {
    const location = useLocation();
    const data = location.state.data;
    const [key, setKey] = useState('');
    useEffect(() => {
        setKey(data.key)
    }, []);
    const handleInput = (e) => {
        setKey(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const dataTrailer = new FormData();
            dataTrailer.append('id', data.id);
            dataTrailer.append('movie_name', data.movie_name);
            dataTrailer.append('key', key);
            const result = await webApi.update(getType.Trailer, dataTrailer);
            if(result.status === 200){
                swal('Success',"Create movie success", 'success')
            }else{
                swal('Error',"sai", 'error')
            }
        }catch(e){

        }
    }
    return (
        <div className="Trailer_form">
            <form onSubmit={handleSubmit} id='trailer_formSubmit'>
                <div className="Trailer_wrapper">
                    <div className="section mb-3">
                        <label htmlFor="">Movie name (id {data.id}):</label>
                        <input 
                            type='text'
                            name='movie_name'
                            readOnly
                            value={data.name_movie}
                        />
                    </div>
                    <div className="section mb-3">
                        <label htmlFor="">Key</label>
                        <div className="input_title">
                            <Input 
                                placeholder='Input key trailer movie...'
                                type='text'
                                name='key'
                                onChange={handleInput}
                                value={key}
                            />
                        </div>
                    </div>


                    <Button className="movie_btn_create">Create</Button>
                </div>
            </form>
        </div>
    )
}

export default EditTrailer
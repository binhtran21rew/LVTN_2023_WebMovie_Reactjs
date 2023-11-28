import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import swal from "sweetalert";


import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';

import webApi, {getType} from '../../../../api/webApi';

const EditGenres = () => {
    const location = useLocation();
    const data = location.state.data;
    const [genreInput, setGenreInput] = useState('');
    useEffect(() => {
        setGenreInput(data.name);
    }, []);
    const handleInput = (e) => {
        setGenreInput(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const dataGenre = new FormData();
            dataGenre.append('id', data.id);
            dataGenre.append('name', genreInput);
            const result = await webApi.update(getType.Genre, dataGenre);
            if(result.status === 200){
                swal('Success',"Create movie success", 'success')
            }else{
                swal('Error',"sai", 'error')
            }
        }catch(e) {}
    }
    return (
        <div className="Genres-form">
            <form onSubmit={handleSubmit}>
                <div className="section mb-3">
                    <label htmlFor="">Genres:</label>
                    <div className="input_title">
                        <Input 
                            placeholder='Input Genre movie...'
                            type='text'
                            name='name'
                            onChange={handleInput}
                            value={genreInput}
                        />
                    </div>
                </div>
                <Button className="movie_btn_create">Create</Button>
                
            </form>
        </div>
    )
}

export default EditGenres
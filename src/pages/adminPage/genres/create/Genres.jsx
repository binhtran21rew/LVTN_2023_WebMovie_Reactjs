import React, {useState} from 'react';
import swal from "sweetalert";

import './genre.scss';

import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';

import webApi, {getType} from '../../../../api/webApi';
const Genres = () => {
    const [genreInput, setGenreInput] = useState('');
    const handleInput = (e) => {
        setGenreInput(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data ={
                name: genreInput
            }
            const loadGenres = await webApi.create(getType.Genre, data);

            if(loadGenres.status === 200){
                swal('Success', loadGenres.message, 'success')
                setGenreInput('');
            }else{
                swal('Warning', loadGenres.message, 'warning')

            }
        }catch(e){

        }
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

export default Genres;
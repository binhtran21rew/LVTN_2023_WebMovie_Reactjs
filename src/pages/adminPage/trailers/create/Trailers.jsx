import React, {useState, useEffect} from 'react';
import AsyncSelect from 'react-select/async';
import swal from "sweetalert";


import './trailer.scss'
import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import SelectOptionCasts from '../../../../component/admin/SelectOption';

import webApi, {getMethod, getType} from '../../../../api/webApi';

const Trailers = () =>{
    const [trailerInput, setTrailerInput] = useState({
        key: '',
    });
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const result = await webApi.getMovieAdmin(getType.Movie);
            setMovies(result);
        }
        getMovies();
    }, []);

    const handleInput = (e) => {
        setTrailerInput({...trailerInput, [e.target.name]: e.target.value});
    }

    const resetValue = () => {
        setTrailerInput({key: ''});
        setMovies([]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const idFrom = document.getElementById('trailer_formSubmit');
            const data = new FormData(idFrom);
            const result = await webApi.create(getType.Trailer, data);
            if(result.status === 200){
                swal('Success',"Create movie success", 'success')
            }else{
                swal('Error',result.message, 'error')
                
            }
            resetValue();
        }catch(e){

        }
    }
    return (
        <div className="Trailer_form">
            <form onSubmit={handleSubmit} id='trailer_formSubmit'>
                <div className="Trailer_wrapper">
                    <div className="section mb-3">
                        <label htmlFor="">Key:</label>
                        <div className="input_title">
                            <Input 
                                placeholder='Input key trailer movie...'
                                type='text'
                                name='key'
                                onChange={handleInput}
                                value={trailerInput.key}
                            />
                        </div>
                    </div>

                    <div className="section mb-3">
                        <label htmlFor="">Select movie:</label>

                            <SelectOptionCasts 
                                data= {movies}
                                name='movie_id'
                                placeholder="Input movie name..."

                            />
                    </div>

                    <Button className="movie_btn_create">Create</Button>
                </div>
            </form>
        </div>
    )
}

export default Trailers;
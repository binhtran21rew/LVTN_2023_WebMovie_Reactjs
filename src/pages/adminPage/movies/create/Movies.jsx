import React, { useState, useEffect, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import swal from "sweetalert";

import './movies.scss';
import {InputDefault as Input, InputRadio} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import img from '../../../../file/image/empty.jpg';
import SelectOptionCasts from '../../../../component/admin/SelectOption';

import webApi, {getType, getMethod} from '../../../../api/webApi';
const Movies = () =>{
    const optionStatus = [
        {
            display: 'now playing',
            name: 'now_playing',
        },
        {
            display: 'upcoming',
            name: 'upcoming',
        },
    ];
    const fileRef = useRef(null);
    const [casts, setCasts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieInput, setMovieInput] = useState({
        title: '',
        release:'',
        overview: '',
    });
    const [imageInput, setImageInput] = useState({
        post_path: null,
        backdrop_path:  null
    });
    const [checkbox, setCheckbox] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const getCast = async () => {
            const result = await webApi.getAll(getType.Cast, getMethod.getAll);
            setCasts(result);
        }
        getCast();
    }, []);

    useEffect(() => {
        const getGenre = async () => {
            const result = await webApi.getAll(getType.Genre, getMethod.getAll);
            setGenres(result);
        }
        getGenre();
    }, []);
    const handleInput = (e) => {
        e.persist()
        setMovieInput({...movieInput, [e.target.name]: e.target.value});
    }

    const handleInputImage = (e) => {
        setImageInput({
            ...imageInput, [e.target.name]: e.target.files[0]
        })
    }

    const handleCheckbox = (e) => {
        setCheckbox(e.target.value);
    }



    const resetValue = () => {
        setMovieInput({
            title: '',
            overview: '',
            release: '',
        })
        setTime({
            time: '',
        })
        fileRef.current.value = null;
        setImageInput({
            post_path: null,
            backdrop_path: null
        })
    }
    const handleInputTime = (e) => {
        setTime(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = new FormData(document.getElementById('form-submit'))
            const result = await webApi.create(getType.Movie, data);
            if(result.status === 200){
                swal('Success',"Create movie success", 'success')
                resetValue();
            }else{
                swal('Error',"sai", 'error')
            }


        }catch(e){
            
        }
    }

    
    return (
        <div className="Movie-form">
            <form onSubmit={handleSubmit} method='POST' encType="multipart/form-data" id="form-submit">
                <div className="movie__wrapper">
                    <div className="movie__input">
                        <div className="movie__input-text">
                            <div className="movie__input-text-header">
                                <div className="section mb-3">
                                    <label htmlFor="">Title:</label>
                                    <div className="input_title">
                                        <Input 
                                            placeholder='Input title movie...'
                                            type='text'
                                            name='title'
                                            onChange={handleInput}
                                            value={movieInput.title}
                                        />
                                    </div>
                                </div>
                                <div className="section mb-3">
                                    <label htmlFor="">Overview:</label>
                                    <div className="input_overview">
                                        <textarea type="text" name='overview' value={movieInput.overview} onChange={handleInput}/>
                                    </div>
                                </div>
                            </div>
                            <div className="movie__input-text-body">
                                <div className="section mb-3 margin">
                                    <label htmlFor="">Status</label>
                                    <div className="input_status">
                                        {optionStatus.map( (item, i) => (
                                            <div className="status_item" key={i}>
                                                <InputRadio 
                                                    onChange={handleCheckbox}
                                                    className="input_checkbox"
                                                    name="status"
                                                    value={item.name}
                                                />
                                                <span>{item.display}</span>
                                            </div>
                                        ))}
                                        
                                    </div>
                                </div>
                                <div className="section mb-3">
                                    <label htmlFor="">Release:</label>
                                    <div className="input_release">
                                        <Input 
                                            placeholder='Input movie release...'
                                            type='date'
                                            name='release'
                                            onChange={handleInput}
                                            value={movieInput.release}
                                        />
                                    </div>
                                </div>

                                <div className="section mb-3">
                                    <label htmlFor="">Select cast name:</label>

                                    <SelectOptionCasts 
                                        data= {casts} 
                                        name="casts[]"
                                        placeholder="Input cast name..."
                                        isMulti={true}
                                    />
                                </div>

                                <div className="section mb-3">
                                    <label htmlFor="">Select genre name:</label>

                                    <SelectOptionCasts 
                                        data= {genres}
                                        name="genres[]"
                                        placeholder="Input genres name..."
                                        isMulti={true}
                                    />
                                </div>

                                <div className="section mb-3">
                                    <label htmlFor="">Input runtime movie:</label>
                                    <Input 
                        
                                        type='number'
                                        name='time'
                                        onChange={handleInputTime}
                                        value={time}
                                        min="1"
                                        // max="12:00"
                                    />
                                    
                                    
                                </div>
                               
                            </div>
                            <Button className="movie_btn_create">Create</Button>
                        </div>
                        <div className="movie__input-image">
                            <div className="section mb-3">
                                <label htmlFor="">Poster image:</label>
                                <div className="input_poster">
                                    <Input 
                                        ref={fileRef}
                                        placeholder='Input poster movie...'
                                        type='file'
                                        name='post_path'
                                        onChange={handleInputImage}
                                    />
                                </div> 
                            </div>
                            <div className="section mb-3 ">
                                <div className="poster_image ">
                                    {
                                        imageInput.post_path 
                                        ? <img id='poster_image-show' src={URL.createObjectURL(imageInput.post_path)} alt="" />
                                        : <img id='poster_image' src={img} alt="" />
                                    }
                                </div>
                            </div>
                            <div className="section mb-3 margin">
                                <label htmlFor="">Background image:</label>
                                <div className="input_backdrop">
                                    <Input 
                                        ref={fileRef}
                                        placeholder='Input background movie...'
                                        type='file'
                                        name='backdrop_path'
                                        onChange={handleInputImage}
                                        className="upload-button"
                                    />
                                </div>
                            </div>
                            <div className="section mb-3">
                                <div className="poster_image">
                                    {
                                        imageInput.backdrop_path 
                                        ? <img id='poster_image' src={URL.createObjectURL(imageInput.backdrop_path )} alt="" />
                                        : <img id='poster_image' src={img} alt="" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Movies;


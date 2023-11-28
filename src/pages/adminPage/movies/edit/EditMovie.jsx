import React, { useState, useEffect, useRef } from 'react';
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { Radio } from 'antd';

import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import img from '../../../../file/image/empty.jpg';
import webApi, {getType, getMethod} from '../../../../api/webApi';
import {SelectDefault} from '../../../../component/admin/SelectOption';

import AsyncSelect from 'react-select/async';
import { splitTime } from '../../../../component/admin/helper';
import {apiWeb} from '../../../../api/apiConfig';

const optionStatus = [
    {
        display: 'now playing',
        name: 'now_playing',
        status: 1
    },
    {
        display: 'upcoming',
        name: 'upcoming',
        status: 0
    },
];


const EditMovie = (props) => {
   
    const location = useLocation();
    const data = location.state.data;
    const fileRef = useRef(null);

    const [casts, setCasts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [checkBox, setCheckBox] = useState(data.status)
    const [time, setTime] = useState('');
    const [input, setInput] = useState({
        title: data.title,
        overview: data.overview,
        release: data.release,
    })
    const [imageDefault, setImageDefault] = useState({
        post_path: data.poster_path,
        backdrop_path:  data.backdrop_path
    });
    const poster = apiWeb.baseUrl + imageDefault.post_path;
    const backdrop = apiWeb.baseUrl + imageDefault.backdrop_path;

    const [imageInput, setImageInput] = useState({
        post_path: null,
        backdrop_path:  null
    });
    const hours = parseInt(splitTime(data.time)[0]),
        minutes = parseInt(splitTime(data.time)[1]),
        timeInminutes = (hours * 60) + minutes;
    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        const getCast = async () => {
            const result = await webApi.getAll(getType.Cast, getMethod.getAll);
            setCasts(result);
            
        }
        const getGenres = async () => {
            const result = await webApi.getAll(getType.Genre, getMethod.getAll);
            setGenres(result);
        }

        getCast();
        getGenres();
        setTime(timeInminutes)
    }, []);

    const handleCheck = (e) => {
        setCheckBox(e.target.value);
    };
    const handleInputTime = (e) => {
        setTime(e.target.value)
    }
    const handleInputImage = (e) => {
        setImageInput({
            ...imageInput, [e.target.name]: e.target.files[0]
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = new FormData(document.getElementById('form-submit-edit'))

            const result = await webApi.update(getType.Movie, data)
            if(result.status === 200){
                swal('Success',"Create movie success", 'success')
            }else{
                swal('Error',"sai", 'error')
            }


        }catch(e){
            
        }

    }

    return (
        <div className="Movie-form">
                <form onSubmit={handleSubmit} method='POST' encType="multipart/form-data" id="form-submit-edit">
                    <div className="movie__wrapper">
                        <div className="movie__input">
                            <div className="movie__input-text">
                                <div className="movie__input-text-header">
                                    <div className="section mb-3">
                                        <label htmlFor="">Movie Id</label>
                                        <div className="input_title">
                                            <input type='text' name='movie_id' value={data.id} readOnly/>
                                        </div>
                                    </div>
                                    <div className="section mb-3">
                                        <label htmlFor="">Title:</label>
                                        <div className="input_title">
                                            <Input 
                                                placeholder='Input title movie...'
                                                type='text'
                                                name='title'
                                                onChange={handleInput}
                                                value={input.title}
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="section mb-3">
                                        <label htmlFor="">Overview:</label>
                                        <div className="input_overview">
                                            <textarea type="text" name='overview' value={input.overview}  onChange={handleInput}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="movie__input-text-body">
                                    <div className="section mb-3 margin">
                                        <label htmlFor="">Status</label>
                                        <div className="input_status">
                                            <Radio.Group onChange={handleCheck} value={checkBox} name='status'>
                                            {optionStatus.map( (item, i) => (
                                                <div className="status_item" key={i}>
                                                    <Radio value={item.status} >{item.display}</Radio>
                                                </div>
                                            ))}
                                            </Radio.Group>
                                            
                                        </div>
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
                                            value={input.release}
                                        />
                                    </div>
                                </div>

                                <div className="section mb-3">
                                    <label htmlFor="">Select cast name:</label>
                                    <SelectDefault 
                                        data={casts}
                                        defaultValue={data.casts}
                                        name={'casts[]'}
                                    />
                                </div>

                                <div className="section mb-3">
                                    <label htmlFor="">Select genre name:</label>

                                    <SelectDefault 
                                        data= {genres}
                                        name="genres[]"
                                        placeholder="Input genres name..."
                                        defaultValue={data.genres}
                                    
                                    />
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
                                            : <img id='poster_image' src={poster} alt="" />
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
                                            ? <img id='poster_image-show' src={URL.createObjectURL(imageInput.backdrop_path)} alt="" />
                                            : <img id='poster_image' src={backdrop} alt="" />
                                        }
                                    </div>
                                </div>
                                <div className="section mb-3">
                                    <label htmlFor="">Input runtime movie (minutes):</label>
                                    <Input 
                                        type='number'
                                        name='time'
                                        onChange={handleInputTime}
                                        value={time}
                                        min="1"
                                    /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        </div>

    )
}

export default EditMovie
import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import swal from "sweetalert";


import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import img from '../../../../file/image/empty.jpg';

import webApi, { getType } from '../../../../api/webApi';
import {apiWeb} from '../../../../api/apiConfig';
const EditCast = () => {
    const fileRef = useRef(null);
    const location = useLocation();
    const data = location.state.data;
    const [castInput, setCastInput] = useState('');
    const [imageDefault, setImageDefault] = useState({
        profile_path: data.profile_path,
    });
    const [imageInput, setImageInput] = useState({
        profile_path : null
    });
    const image = apiWeb.baseUrl + imageDefault.profile_path;
    useEffect(() => {
        setCastInput(data.name)
    }, []);
    const handleInput = (e) => {
        setCastInput(e.target.value)
    }
    const handleInputImage = (e) => {
        setImageInput({
            ...imageInput, [e.target.name]: e.target.files[0]
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const dataCast = new FormData();
            dataCast.append('id', data.id);
            dataCast.append('name', castInput);
            dataCast.append('profile_path', imageInput.profile_path);
            const result = await webApi.update(getType.Cast, dataCast);
            if(result.status === 200){
                swal('Success',"Create movie success", 'success')
            }else{
                swal('Error',"sai", 'error')
            }
        }catch(e) {}
    }
    return (
        <div className="Cast-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data" id='form-submit-cast'>
                <div className="Cast_wrapper">
                    <div className="section mb-3">
                        <label htmlFor="">Cast name (id {data.id}):</label>
                        <div className="input_title">
                            <Input 
                                placeholder='Input cast name...'
                                type='text'
                                name='name'
                                onChange={handleInput}
                                value={castInput}
                            />
                        </div>
                    </div>
                    <div className="section mb-3">
                        <label htmlFor="">Poster image:</label>
                        <div className="input_poster">
                            <Input 
                                ref={fileRef}
                                placeholder='Input poster movie...'
                                type='file'
                                name='profile_path'
                                onChange={handleInputImage}
                            />
                        </div> 
                    </div>

                    <Button className="movie_btn_create">Create</Button>


                </div>
            

                <div className="section mb-3">
                    <div className="profile_image">
                        {
                            imageInput.profile_path 
                            ? <img id='profile_image' src={URL.createObjectURL(imageInput.profile_path)} alt="" />
                            : <img id='profile_image' src={image} alt="" />
                        }
                    </div>
                </div>
               


            </form>
    </div>
    )
}

export default EditCast
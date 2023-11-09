import React, { useRef, useState } from 'react';
import swal from "sweetalert";


import './cast.scss';
import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import img from '../../../../file/image/empty.jpg';

import webApi from '../../../../api/webApi';

const Casts = () =>{
    const fileRef = useRef(null);
    const [castInput, setCastInput ] = useState('');
    const [imageInput, setImageInput] = useState({
        profile_path : null
    });
    const handleInput = (e) => {
        setCastInput(e.target.value)
    }
    const handleInputImage = (e) => {
        setImageInput({
            ...imageInput, [e.target.name]: e.target.files[0]
        })

    }
    const resetValue = () => {
        setCastInput('');
        fileRef.current.value = null;
        setImageInput({profile_path: null})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = new FormData()
            data.append('name', castInput)
            data.append('profile_path', imageInput.profile_path)

            const result = await webApi.createCast(data);
            if(result){
                swal('Success',"create cast success", 'success')
                resetValue();
            }
        }catch(e){
            
        }
    }
    return (
        <div className="Cast-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data" id='form-submit-cast'>
                <div className="Cast_wrapper">
                    <div className="section mb-3">
                        <label htmlFor="">Title:</label>
                        <div className="input_title">
                            <Input 
                                placeholder='Input title movie...'
                                type='text'
                                name='title'
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
                            : <img id='profile_image' src={img} alt="" />
                        }
                    </div>
                </div>
               


            </form>
    </div>
    )
}

export default Casts;
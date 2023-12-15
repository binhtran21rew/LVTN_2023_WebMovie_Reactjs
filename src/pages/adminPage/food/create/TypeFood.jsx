import React, { useState, useRef, useEffect } from 'react'
import {Link } from 'react-router-dom';
import swal from "sweetalert";


import './food.scss';
import {InputDefault as Input, SelectCustom} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
import img from '../../../../file/image/empty.jpg';
import webApi, {getType, getMethod} from '../../../../api/webApi';

const TypeFood = () => {
    const fileRef = useRef(null);

    const [listFood, setListFood] = useState([]);
    const [foodSelect, setFoodSelect] = useState([]);
    const [foodSelectCount, setFoodSelectCount] = useState({});
    const [inputFood, setInputFood] = useState({
        name: '',
        price: '',
        count: ''
    })
    const [imageInput, setImageInput] = useState({
        image: null,
    });
    useEffect(() => {
        const getFood = async () => {
            const result = await webApi.getAll(getType.Food, getMethod.getAll);
            setListFood(result);
        }
        getFood();
    }, []);

    const handleInput = (e) => {
    setInputFood({...inputFood, [e.target.name]: e.target.value});
    }
    const handleInputImage = (e) => {
        setImageInput({
            ...imageInput, [e.target.name]: e.target.files[0]
        })
    }
    const resetValue = () => {
        setInputFood({
            name: '',
            price: '',
            count: ''
        })
        setImageInput({
            image: null,
        })
        fileRef.current.value = null;    
      }
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const data = new FormData(document.getElementById('formfood'));
            Object.keys(foodSelect).forEach(key => data.append('detailFood[]', foodSelect[key].name));
            Object.keys(foodSelectCount).forEach(key => data.append(`foodCount[${key}] `, foodSelectCount[key]));
    
    
            const result = await webApi.create(getType.ComboFood, data);
            if(result.status === 200){
                swal('Success', result.message, 'success')
                resetValue();
            }else{
                swal('Error',result.message,'error')
            }
      
        }catch(e){

        }




    }
    return (
        <div className='TypeFood-page'>
            <div className="Food">
                    <div className="Food__header">
                        <div>
                            <span>Type Food</span>
                            <div className='link_food'>
                                <div className='LinkTo'>
                                    <Link to={`/admin/list_food/foods`}>go to list food </Link>
                                </div>
                                <div className='LinkTo'>
                                    <Link to={`/admin/foods/list_food`}>create food </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Food__body">
                        <form onSubmit={handleSubmit} id="formfood">
                            <div className="section mb-3">
                                <label htmlFor="">Name display:</label>
                                <div className="input_name">
                                    <Input 
                                        placeholder='Input name...'
                                        type='text'
                                        name='name'
                                        onChange={handleInput}
                                        value={inputFood.name}
                                    />
                                </div>
                            </div>
                            <div className="section mb-3">
                                <label htmlFor="">detail combo:</label>
                                <div className="input_name">
                                <SelectCustom 
                                    data={listFood} 
                                    setListSelect={setFoodSelect}
                                    listSelect={foodSelect}
                                    isSelectCount={true}
                                    setSelectCount = {setFoodSelectCount}
                                    selectCount = {foodSelectCount}
                                />
                                </div>
                            </div>
            
                            <div className="section mb-3">
                                <label htmlFor="">Quantity:</label>
                                <div className="input_count">
                                    <Input 
                                        type='number'
                                        name='count'
                                        onChange={handleInput}
                                        value={inputFood.count}
                                        min={0}
                                    />
                                </div>
                            </div>
                            <div className="section mb-3">
                                <label htmlFor="">Price:</label>
                                <div className="input_count">
                                    <Input 
                                        type='number'
                                        name='price'
                                        onChange={handleInput}
                                        value={inputFood.price}
                                        min={0}
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
                                    name='image'
                                    onChange={handleInputImage}
                                />
                            </div> 
                            </div>
                            <div className="section mb-3 image">
                                <div className="poster_image">
                                    {
                                        imageInput.image 
                                        ? <img id='poster_image-show'  src={URL.createObjectURL(imageInput.image)} alt="" />
                                        : <img id='poster_image' src={img} alt="" />
                                    }
                                </div>
                            </div>
                            <Button className="movie_btn_create">Create</Button>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default TypeFood
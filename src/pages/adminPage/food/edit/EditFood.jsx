import React, { useState, useEffect, useRef } from 'react'
import swal from "sweetalert";
import { useLocation, Link, useHistory } from "react-router-dom";


import '../create/food.scss';

import {InputDefault as Input, InputRadio, SelectCustom} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';

import img_drink from '../../../../file/image/drink.jpg';
import img_popcorn from '../../../../file/image/popcorn.jpg';
import webApi, {getType, getMethod} from '../../../../api/webApi';
import {apiWeb} from '../../../../api/apiConfig';

import img from '../../../../file/image/empty.jpg';

const EditFood = () => {
    const location = useLocation();
    const data = location.state.data;
    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get('type');

    if(type === 'food'){
        return <ViewEditFood data={data}/>
    }else{
        return <ViewEditCombo data={data}/>
    }


}


const ViewEditFood = (props) => {
    const history = useHistory();
    const data = props.data;
    const detail = data.combo[0];

    const optionStatus = [
        {
            display: 'Drinks',
            name: 'drink',
            defaultprice: '25000'
        },
        {
            display: 'Foods',
            name: 'food',
            defaultprice: '30000'
        },
    ];
    const [checkbox, setCheckbox] = useState('');
    const price = optionStatus.filter((e) => e.name === checkbox);
    const [input, setInput] = useState({
        name: detail.name,
        count: detail.count,
    })
    const [pricerChange, setPricerChange] = useState('');

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }
    const handleCheckbox = (e) => {
        setCheckbox(e.target.value);
    }
    const handleInputPrice = (e) => {
        setPricerChange(e.target.value);
    }
    const resetValue = () => {
        setInput({
            name: '',
            count: '',
        })

        setCheckbox('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    

        try{
            const dataUpdate = new FormData(document.getElementById('form-submit'))
            dataUpdate.append('id', data.id)
            dataUpdate.append('idCombo', detail.id)

            const result = await webApi.update(getType.Food, dataUpdate);
            if(result.status === 200){
                swal('Success',result.message, 'success')
                resetValue();
                history.push('/admin/list_food/foods');

            }else{
                swal('Error', result.message, 'error')
            }
        }catch(e){
            
        }

    }
    return(
        <div className="Food-form">
            <form onSubmit={handleSubmit} id='form-submit'>
                <div className="section mb-3">
                <label htmlFor="">Name food:</label>
                <div className="input_type">
                    <Input 
                        placeholder='Input type food.'
                        type='text'
                        name='name'
                        onChange={handleInput}
                        value={input.name}
                    />
                </div>
                </div>

                <div className="section mb-3">
                <label htmlFor="">Quantity:</label>
                <div className="input_name">
                    <Input 
                        type='number'
                        name='count'
                        onChange={handleInput}
                        value={input.count}
                        min={0}
                    />
                </div>
                </div>

                <div className="section mb-3">
                <label htmlFor="">Type of Food:</label>
                <div className="input_status">
                    {optionStatus.map( (item, i) => (
                        <div className="status_item" key={i}>
                            <InputRadio 
                                onChange={handleCheckbox}
                                className="input_checkbox"
                                name="combo"
                                value={item.name}
                            />
                            <span>{item.display}</span>
                        </div>
                    ))}
                </div>
                </div>

                <div className="section mb-3 image">
                    <div className="poster_image">
                        {
                            checkbox === 'drink' 
                            ? (
                            <>
                            <label htmlFor="">Price {checkbox} (VND):</label>
                                <div className="input_name">
                                    <input 
                                    type='number'
                                    name='price'
                                    onChange={handleInputPrice}
                                    defaultValue={price[0].defaultprice}
                                    min={0}
                                    />
                                </div>
                            <br/>
                            <img id='poster_image-show'  src={img_drink} alt="" />

                            </>
                        )
                            : null
                        }
                        {
                            checkbox === 'food' 
                            ? <>
                            <label htmlFor="">Price {checkbox} (VND):</label>
                            <div className="input_name">
                                <input 
                                    type='number'
                                    name='price'
                                    onChange={handleInputPrice}
                                    defaultValue={price[0].defaultprice}
                                    min={0}
                                />
                            </div>
                            <br/>
                            <img id='poster_image-show'  src={img_popcorn} alt="" />

                        </>

                            : null
                        }
                    </div>
                </div>
                <Button className="movie_btn_create">Create</Button>
            </form>
      
        </div>
    )
}


const ViewEditCombo = (props) => {
    const history = useHistory();

    const data = props.data;
    const fileRef = useRef(null);

    const [listFood, setListFood] = useState([]);
    const [foodSelect, setFoodSelect] = useState([]);
    const [foodSelectCount, setFoodSelectCount] = useState({});
    const [inputFood, setInputFood] = useState({
        name: data.name,
        price: data.price,
        count: data.count
    })
    const [imageInput, setImageInput] = useState({
        image: null,
    });

    const imageDefault = apiWeb.baseUrl+data.image;

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const dataEdit = new FormData(document.getElementById('formfood'));
            dataEdit.append('idCombo', data.id);
            Object.keys(foodSelect).forEach(key => dataEdit.append('detailFood[]', foodSelect[key].name));
            Object.keys(foodSelectCount).forEach(key => dataEdit.append(`foodCount[${key}] `, foodSelectCount[key]));
    
            const result = await webApi.update(getType.ComboFood, dataEdit);
            if(result.status === 200){
                swal('Success', result.message, 'success');
                resetValue();
                history.push('/admin/list_food/foods');
            }else{
                swal('Error',result.message,'error')
            }
        }catch(e){

        }
    }
    return (

        <div className='TypeFood-page'>
            <div className="Food">
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
                                <input 
                                    type='text'
                                    value={data.detail}
                                    name='detail_default'
                                    className='detail_default'
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="section mb-3">
                            <label htmlFor="">Change detail combo:</label>
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
                                    : <img id='poster_image' src={imageDefault || img} alt="" />
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

export default EditFood
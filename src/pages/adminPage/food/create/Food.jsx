import React, { useState, useEffect } from 'react'
import swal from "sweetalert";

import './food.scss';

import {InputDefault as Input, InputRadio} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';

import img_drink from '../../../../file/image/drink.jpg';
import img_popcorn from '../../../../file/image/popcorn.jpg';
import webApi, {getType, getMethod} from '../../../../api/webApi';
const Food = () => {
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
    name: '',
    count: '',
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
      const data = new FormData(document.getElementById('form-submit'))

      const result = await webApi.create(getType.Food, data);
      if(result.status === 200){
          swal('Success',result.message, 'success')
          resetValue();
      }else{
          swal('Error', result.message, 'error')
      }
  }catch(e){
      
  }

  }

  return (
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

export default Food
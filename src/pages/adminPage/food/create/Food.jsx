import React, { useState } from 'react'
import {InputDefault as Input} from '../../../../component/input/Input';
import Button from '../../../../component/button/Button';
const Food = () => {
  const [inputFood, setInputFood] = useState({
    type: '',
    name: '',
    price: ''
  })

  const handleInput = (e) => {
    setInputFood({...inputFood, [e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data ={
      'type': inputFood.type,
      'name': inputFood.name,
      'price': inputFood.price
    };

    console.log(data);

  }

  return (
    <div className="Food-form">
      <form onSubmit={handleSubmit}>
        <div className="section mb-3">
            <label htmlFor="">Type food:</label>
            <div className="input_type">
                <Input 
                    placeholder='Input type food.'
                    type='text'
                    name='type'
                    onChange={handleInput}
                    value={inputFood.type}
                />
            </div>
        </div>
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
            <label htmlFor="">Price:</label>
            <div className="input_price">
                <Input 
                    type='number'
                    name='price'
                    onChange={handleInput}
                    value={inputFood.price}
                    min={0}

                />
            </div>
        </div>
        <Button className="movie_btn_create">Create</Button>
        
    </form>
    </div>
  )
}

export default Food
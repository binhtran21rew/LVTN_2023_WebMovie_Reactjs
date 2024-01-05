import React, {useState, useEffect, Fragment} from 'react'

import './food.scss';

import Modal, { ModalContent } from '../../../modal/Modal';
import Button from '../../../button/Button';

import webApi, { getMethod, getType } from '../../../../api/webApi';
import apiConfig, { apiWeb } from '../../../../api/apiConfig';

const Food = (props) => {
  const {
    selectFood,
    setSelectFood
  } = props;

  const [listCombo, setListCombo] = useState([]);
  const [list, setList] = useState([]);
  const [selectCount, setSelectCount] = useState([]);
  useEffect(() => {
    const getFood = async () => {
      const result = await webApi.getFoodAvailable();
      setListCombo(result.filter((item) => item.food.length === 0 ));
      setList(result.filter((item) => item.food.length > 0 ));

    }
    getFood();


  }, []);

  const groupBy = (array, type, value) => {
    return array.reduce((result, currentValue) => {
      (
        result[currentValue[type][0][value]] =
        result[currentValue[type][0][value]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  const onChangeCount = (id, value, price, name) => {
    const a = value * price;
    setSelectCount({...selectCount, [id]: {value, price: a, name}});
  }

  const handleSubmit = () => {
    Object.entries(selectCount).filter(([key, item]) => item.value === '0' && delete selectCount[key])
    setSelectFood(selectCount);
    const modal = document.querySelector(`#modal_food`);
    modal.classList.toggle('active');
  }

  const handleCancel = () => {
    setSelectFood([]);
    const modal = document.querySelector(`#modal_food`);
    modal.classList.toggle('active');
  }

  const renderFood = () => {
    const listType = groupBy(
      list,
      'food',
      "type"
    );
    let entries = Object.entries(listType);
    if(list.length > 0){
      return entries.map(([key, value], i) => {
          return (
           <li key={i}>
            <h2>{key}</h2>
            {value.map((data, i) => {
              return(
                <div className="combo-item" key={i}>
                 
                  <div className="combo-text">
                    <h3>{data.name}</h3>
                    <p>{data.detail}</p>
                    <div className="combo-price">
                      <span>giá: </span>
                      {data.price}
                      <sup>đ</sup>
                    </div>
                  </div>
                  <div className="combo-image">
                    <img src={apiWeb.baseUrl+data.image} alt="" />
                  </div>
                  <div className="combo-price">
                    <div className="selectCount">
                      <input 
                        type='number'  
                        min={0} 
                        name='foodCount'
                        onChange={(e) => onChangeCount(data.id, e.target.value, data.price, data.name)}   
                        value={selectCount[data]}
                        defaultValue={0}
                        
                      />
                    </div>
                  </div>
                  <div className="combo-total">
                    {Object.entries(selectCount).map(([key, value], i) => {
                      if(data.id === parseInt(key)){
                        return (
                          <Fragment key={i}>
                            {  
                              value.price
                            }
                          </Fragment>
                        )
                      }
                    })}
                    <sup>đ</sup>
                  </div>
                </div>
              )
            })}
           </li>
          );
      });   
    }

  }

  var renderCombo = '';
  if(listCombo.length > 0){
    renderCombo = (
      <li>
        <h2>Combo</h2>
        {
          listCombo.map((value, i) => {
            return (
              <div className="combo-item"  key={i}>
                
                <div className="combo-text">
                  <h3>{value.name}</h3>
                  <p>{value.detail}</p>
                  <div className="combo-price">
                    <span>giá: </span>
                    {value.price}
                    <sup>đ</sup>

                  </div>
                </div>
                <div className="combo-image">
                  <img src={apiWeb.baseUrl+value.image} alt="" />
                </div>
                <div className="combo-price">
                    <div className="selectCount">
                      <input 
                        type='number'  
                        min={0} 
                        name='foodCount'
                        onChange={(e) => onChangeCount(value.id, e.target.value, value.price, value.name)}   
                        value={selectCount[value]}
                        defaultValue={0}
                      />
                    </div>
                  </div>
                  <div className="combo-total">
                    {Object.entries(selectCount).map(([key, item], i) => {
                      if(value.id === parseInt(key)){
                        return (
                          <Fragment key={i}>
                            {  
                             item.price
                            }
                          </Fragment>
                        )
                      }
                    })}
                    <sup>đ</sup>
                  </div>
              </div>
            );
          })  
        }
      </li>    
    )
  }

  return (
    <Modal active={false} id={`modal_food`}>
        <ModalContent className="food-picked">
            <div className="Food_wrapper">
              <ul>
                {renderFood()}
                {renderCombo}
              </ul>
            </div>

            <div className="Food_footer">
              <Button 
                className={"ticket-btn"}
                onClick={handleCancel}
              >Hủy</Button>
              <Button 
                className={"ticket-btn"}
                onClick={handleSubmit}
              >đồng ý</Button>
            </div>
        </ModalContent>
    </Modal>
  )
}

export default Food
import React from 'react'
import { Link } from 'react-router-dom';


import './card.scss';
const Card = (props) => {
    var link = ''
    if(props.detail){
        link = (
            <div className='small-box-footer'> 
                <input type="button" value="Show Detail" onClick={props.onClick}/>
            </div>
        )
    }else{
        link = (
            <Link to={`${props.linkTo}`} className='small-box-footer'> 
                <span>
                    More info
                </span>
                <div className="icon-link">
                    <svg width="1em" height="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M256 8c137 0 248 111 248 248S393 504 256 504S8 393 8 256S119 8 256 8M140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12"></path>
                    </svg>
                </div>
            </Link>
        )
    }
    return (
        <div className="col-lg-3 col-6">
            <div className={`small-box ${props.bgColor}`}>
                <div className="inner">
                    <h3>{props.number}</h3>
                    <p>{props.title}</p>
                </div>
                <div className="icon">
                    {props.svg}
                </div>
                {link}
            </div>
        </div>
    )
}

export default Card
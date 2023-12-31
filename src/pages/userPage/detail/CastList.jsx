import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';


import webApi, {getType, getMethod} from '../../../api/webApi';
import {apiWeb} from '../../../api/apiConfig';
const CastList = props => {
    const [casts, setCasts] = useState([]);
    useEffect(() => {
        try{
            const getCredits = async () => {
                const response = await webApi.getDetails(getType.Cast, getMethod.detail, props.id)
                setCasts(response.data.cast.slice(0,5));
            }
            getCredits();
        }catch(e){
            
        }
    }, [props.id]);

    return (
        <div className='casts'>
        {casts.map((cast, i) => (
            <div key={i} className="casts__item">
                <div className="casts__item__img" style={{backgroundImage: `url(${apiWeb.baseUrl}${cast.profile_path})`}}></div>
                <p className="casts__item__name">{cast.name}</p>
            </div>
        ))}
        </div>
    )
}

export default CastList;
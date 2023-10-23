import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';


import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';


const CastList = props => {
    const [casts, setCasts] = useState([]);
    useEffect(() => {
        try{
            const getCredits = async () => {
                const response = await tmdbApi.credits(props.id);
                setCasts(response.cast.slice(0,5));
            }
            getCredits();
        }catch(e){
            console.log(e);
        }
    }, [props.id]);
    console.log(casts);
    return (
        <div className='casts'>
        {casts.map((cast, i) => (
            <div key={i} className="casts__item">
                <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})`}}></div>
                <p className="casts__item__name">{cast.name}</p>
            </div>
        ))}
        </div>
    )
}

export default CastList;
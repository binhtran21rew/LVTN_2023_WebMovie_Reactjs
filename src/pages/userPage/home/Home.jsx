import React, { useEffect} from 'react';
import webApi from "../../../api/webApi";

import Carousel from '../../../component/client/carousel/Carousel';
import TicketOnline from '../../../component/client/cardContent/TiketOnline';
import './home.scss';
import MovieContent from '../../../component/client/movieContent/MovieContent';
const Home = () => {

    const queryParameters = new URLSearchParams(window.location.search)
    const query = queryParameters.get("email_verify_url");

    useEffect(() => {
        let mounted = true;
        if(query !== null){
            const params = {
                name: query.split('/')[4],
                id: query.split('/')[5],
                hash:   query.split('/')[6]
            }
            const verified = async () => {
                if(mounted){
                    const result = await webApi.verifiyEmail(params);
                    if(result){
                        window.close();
                    }
                }

            }; 
            verified();
        }
        return () => {
            mounted = false;
        }
    }, [query]);
    return(
        <div className="Home">
            <TicketOnline />
            <Carousel />
            <MovieContent />
           
        </div>
    )
}

export default Home;
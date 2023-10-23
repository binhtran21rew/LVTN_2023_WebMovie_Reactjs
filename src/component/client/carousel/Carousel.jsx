import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay  } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './carousel.scss';

import tmdbApi, { movieType } from '../../../api/tmdbApi';
import apiConfig from '../../../api/apiConfig';
import Button, { OutlineButton } from '../../button/Button';
import Modal, { ModalContent } from '../../modal/Modal';

const Carousel = (props) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const getMovies = async () =>{
            const params = {
                language: 'vi-VN',
                page :1
            };
            try{
                const response = await tmdbApi.getMovieList(movieType.now_playing, {params});
                setMovies(response.results);

            }catch(e){
                console.log(e);
            }
        }
        
        getMovies();
    }, []);
    console.log(movies);
    return (
        <div className="hero-slide">
            <Swiper
            modules = {[Autoplay,Pagination, Navigation]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            >
                {
                    movies.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive})  => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}

                        </SwiperSlide>
                    ))
                }

            </Swiper>
            {
                movies.map((item, i) => <TrailerModal key={i} item={item}></TrailerModal> )
            }

        </div>
    )
}


const HeroSlideItem = props => {
    let history = useHistory();

    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path: item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(item.id);
        if(videos.results.length > 0) {
            const videosSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videosSrc);
        }else{
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }
    return(
        <div className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className='title'>
                        {item.title}
                    </h2>
                    <div className="overview">
                        {item.overview}
                    </div>
                    <div className="btns">
                        <Button onClick = {() => history.push('/movie/' + item.id)} className='btn__primary'>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)}/>
                </div>
            </div>

        </div>
    )

}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute('src','');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width='100%' height='500px' title='trailer'></iframe>
            </ModalContent>
        </Modal>
    )
}

export default Carousel;

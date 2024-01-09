import React from 'react'
import {Link, useParams } from 'react-router-dom';

import './catalogDetailAdmin.scss';

import RenderPage from '../../../component/admin/renderPage';
const CatalogDetailAdmin = () => {
    const {name, id} = useParams();
    switch(name){
        case 'role':
            return (
                <div className='Admin-catalog_detail'>
                    <div className="Catalog_detail">
                        <div className="Catalog_detail__header">
                            <span>Datail {name}</span>
                            <div className='LinkTo'>
                                <Link to={`/admin/${name}`}>go to list {name} </Link>
                            </div>
                        </div>
                        <div className="Catalog__body">
                            <RenderPage page={`detail_${name}`}/>
                        </div>
                    </div>
                </div>
            )
        case "room":
            return (
                <div className='Admin-catalog_detail'>
                    <div className="Catalog_detail">
                        <div className="Catalog_detail__header">
                            <span>Datail {name}</span>
                            <div className="customRoom">
                                <div className='LinkTo'>
                                    <Link to={`/admin/room/seat/${id}`}>change seat room </Link>
                                </div>
                                <div className='LinkTo'>
                                    <Link to={`/admin/list_room/rooms`}>go to list {name} </Link>
                                </div>

                            </div>
                        </div>
                        <div className="Catalog__body">
                            <RenderPage page={`detail_${name}`}/>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div className='Admin-catalog_detail'>
                    <div className="Catalog_detail">
                        <div className="Catalog_detail__header">
                            <span>Datail {name}</span>
                            <div className='LinkTo'>
                                <Link to={`/admin/list_${name}/${name}s`}>go to list {name} </Link>
                            </div>
                        </div>
                        <div className="Catalog__body">
                            <RenderPage page={`detail_${name}`}/>
                        </div>
                    </div>
                </div>
            )
            
        
    }
}

export default CatalogDetailAdmin
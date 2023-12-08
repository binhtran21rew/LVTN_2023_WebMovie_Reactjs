import React from 'react';
import {Link, useParams } from 'react-router-dom';


import RenderPage from '../../../component/admin/renderPage';

import './catalog-admin.scss';
const CatalogAdmin = () => {
    const {name, list} = useParams();


    return (
        <div className='Admin-catalog'>
            <div className="Catalog">
                <div className="Catalog__header">
                    {name === 'foods' ? <span>Danh mục {name}</span> : <span>{name}</span>}
                    
                    <div className='LinkTo'>
                        <Link to={`/admin/${list}/${name}`}>go to {list} </Link>
                    </div>
                </div>
                <div className="Catalog__body">

                    <RenderPage page={name} list={list}/>
                </div>
            </div>
        </div>
    )
}

export default CatalogAdmin;
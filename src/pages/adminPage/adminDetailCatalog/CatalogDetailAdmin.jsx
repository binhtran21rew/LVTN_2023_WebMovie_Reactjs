import React from 'react'
import {Link, useParams } from 'react-router-dom';

import './catalogDetailAdmin.scss';

import RenderPage from '../../../component/admin/renderPage';
const CatalogDetailAdmin = () => {
    const {name, id} = useParams();

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

export default CatalogDetailAdmin
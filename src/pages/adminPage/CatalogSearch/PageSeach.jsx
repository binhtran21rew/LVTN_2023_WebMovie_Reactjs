import React from 'react';
import {Link, useParams } from 'react-router-dom';



import './pagesearch.scss';
import RenderPage from '../../../component/admin/renderPage';
const CatalogSearch = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const type = queryParameters.get("type");
  return (
    <div className='Admin-catalog'>
      <div className="Catalog">
        <div className="Catalog__header">
            <>
               <span>{type}</span>

                <div className='LinkTo'>
                    <Link to={`/admin/${type}s/list_${type}`}>go back list {type} </Link>
                </div>
            </>
        </div>
        <div className="Catalog__body">

            <RenderPage page={`search_${type}`}/>
        </div>
      </div>
    </div>
  )
}

export default CatalogSearch;
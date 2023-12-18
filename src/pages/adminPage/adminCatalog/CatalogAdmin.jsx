import React from 'react';
import {Link, useParams } from 'react-router-dom';


import RenderPage from '../../../component/admin/renderPage';

import './catalog-admin.scss';
const CatalogAdmin = () => {
    const {name, list} = useParams();
    const listname = list.replace('_', ' ');
    const namelowerCase = list.toLowerCase();

    switch(name){
        case `${namelowerCase}_Trashed`:
            return (
                <div className='Admin-catalog'>
                    <div className="Catalog">
                        <div className="Catalog__header">
                            <>
                                <span>Create {name.replace('_', ' ')}</span>
                                <div className='LinkTo'>
                                    <Link to={`/admin/list_${namelowerCase}/${namelowerCase}`}>go to {listname} </Link>
                                </div>
                            </>
                        </div>
                        <div className="Catalog__body">
                            <RenderPage page={name} list={list}/>
                        </div>
                    </div>
                </div>
            )
        case 'foods':
            return(
                <div className='Admin-catalog'>
                    <div className="Catalog">
                        <div className="Catalog__header">
                            <div>
                                <span>Danh mục {name}</span>

                                <div className='link_custom'>
                                    <div className='LinkTo'>
                                        <Link to={`/admin/${list}/${name}`}>go to {listname}</Link>
                                    </div>
                                    <div className='LinkTo'>
                                        <Link to={`/admin/combo_${name}`}>create combo {name} </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Catalog__body">

                            <RenderPage page={name} list={list}/>
                        </div>
                    </div>
                </div>
                
            )

        case 'accounts':
            return (
                <div className='Admin-catalog'>
                <div className="Catalog">
                    <div className="Catalog__header">
                        <span>Create {name.replace('_', ' ')}</span>
                        <div className="link_custom">
                            <div className='LinkTo'>
                                <Link to={`/admin/${list}/${name}`}>go to {listname}</Link>
                            </div>
                            <div className='LinkTo'>
                                <Link to={`/admin/role`}>go to list role</Link>
                            </div>
                        </div>

                    </div>
                    <div className="Catalog__body">
                        <RenderPage page={name} list={list}/>
                    </div>
                </div>
            </div>
            )
        case 'list_account':
            return (
                <div className='Admin-catalog'>
                <div className="Catalog">
                    <div className="Catalog__header">
                        <span>{name.replace('_', ' ')}</span>
                        <div className="link_custom">
                            <div className='LinkTo'>
                                <Link to={`/admin/${list}/${name}`}>go to {listname}</Link>
                            </div>
                            <div className='LinkTo'>
                                <Link to={`/admin/role`}>go to list role</Link>
                            </div>
                        </div>
                    </div>
                    <div className="Catalog__body">
                        <RenderPage page={name} list={list}/>
                    </div>
                </div>
            </div>
            )
        default:
            return(
                <div className='Admin-catalog'>
                    <div className="Catalog">
                        <div className="Catalog__header">
                            <>
                                <span>{name.replace('_', ' ')}</span>
                                <div className='LinkTo'>
                                    <Link to={`/admin/${list}/${name}`}>go to {listname} </Link>
                                </div>
                            </>
                        </div>
                        <div className="Catalog__body">

                            <RenderPage page={name} list={list}/>
                        </div>
                    </div>
                </div>
            )
    }
}

export default CatalogAdmin;
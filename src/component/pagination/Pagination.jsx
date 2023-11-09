import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


import './pagination.scss';
const PaginationItem = ({...props}) => {
    return (
        <>
            {/* <RenderItemPagiantion currentItems={currentItems}/> */}
            <ReactPaginate 
                breakLabel="..."
                nextLabel= "next >"
                onPageChange={props.handleClick}
                pageRangeDisplayed={3}
                pageCount={props.pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </>
    )
}



export default PaginationItem;
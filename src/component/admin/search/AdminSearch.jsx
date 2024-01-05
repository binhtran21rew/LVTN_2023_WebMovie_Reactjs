import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import './search.scss';

import Input from '../../input/Input';
import Button from '../../button/Button';
const AdminSearch = (props) => {
    const {
        filter,
        type,
    } = props
    const history = useHistory();
    const [keyword, setKeyword] = useState('');
    const isDesktop = useMediaQuery('(min-width:1141px');



    const gotoSearch = () => {
        if(keyword.trim().length > 0){
            history.push(`/admin/search?type=${type}&filter=${filter}&keyword=${keyword}`);
        }
    }
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if(e.keyCode === 13){
                gotoSearch();
            }
        }
        document.addEventListener('keyup', enterEvent, false);

        return () =>{
            document.removeEventListener('keyup', enterEvent);

        }
    }, [keyword, gotoSearch]);
    return (
        <div className="search">
            <Input 
                type="text"
                placeholder="Tìm kiếm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}   
                className="search-input" 
                disabled={props.disabled}
            />
            {isDesktop ? <Button className="small search-button" onClick={gotoSearch}> Search </Button> : ''}
        </div>
    )
}


export default AdminSearch;


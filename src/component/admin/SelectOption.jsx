import React, {useState, useEffect} from 'react';
import AsyncSelect from 'react-select/async';



import webApi from '../../api/webApi';
const SelectOptionCasts = (props) => {
    const [selectValue, setSelectValue] = useState(null)
    const handleChange = (selectOption) => {
        setSelectValue(selectOption);
    }
    const filterOptions = (inputValue) => {
        return props.data.filter((i) =>  (i.title||i.name).toLowerCase() .includes(inputValue.toLowerCase()))
    }
    const loadOption = (searchValue, callback) =>{
        if(searchValue){
            setTimeout(() => {
                callback(filterOptions(searchValue));
            },2000)
        }
    }
    return (
        <AsyncSelect 
            cacheOptions={false}
            defaultOptions
            value={selectValue}
            getOptionLabel={e => e.name||e.title}
            getOptionValue={e => e.id}
            loadOptions={loadOption} 
            onChange={handleChange} 
            name={props.name}
            isMulti 
            placeholder={props.placeholder || 'Select'}
        />
    )
}



export default SelectOptionCasts;
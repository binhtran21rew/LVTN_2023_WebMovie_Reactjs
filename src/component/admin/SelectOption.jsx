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
    const setStyle = {
        control: (styles) => ({...styles, backgroundColor: "white"}),
        option: (styles) => {
            return {...styles, color: 'black'}
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
            isMulti={props.isMulti}
            placeholder={props.placeholder || 'Select'}
            styles={setStyle}

            isClearable
        />
    )
}

export const SelectDefault = (props) => {
    const filterOptions = (inputValue) => {
        return props.data.filter((i) =>  (i.title||i.name).toLowerCase() .includes(inputValue.toLowerCase()))
      };
    const loadOptions = (searchValue, callback) =>{
        if(searchValue){
            setTimeout(() => {
                callback(filterOptions(searchValue));
            },2000)
        }
    }

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            getOptionLabel={e => e.name||e.title}
            getOptionValue={e => e.id}
            defaultValue={props.defaultValue}
            name={props.name}
            placeholder={props.placeholder || 'Select...'}

        />
    )
}



export default SelectOptionCasts;
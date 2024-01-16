import React, {useState, useEffect} from 'react';
import AsyncSelect from 'react-select/async';
import { Select, Space } from 'antd';

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

export const SelectAnt = (props) => {
    const options = []
    if(props.type === 'movie'){
        props.data.map((data) => options.push({
            value: data.id,
            label: data.title
        }))
    }else{
        props.data.map((data) => options.push({
            value: data.id,
            label: data.name
        }))
    }
    const handleChange = (value) => {
        props.setSelect(value)
    };
    const onSearch = (value) => {
    };
    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return(
        <Select
            mode={props.isMulti ? "multiple" : ''}
            allowClear
            style={{
                width: '100%',
            }}
            showSearch
            placeholder={props.placeholder}
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={filterOption}
            onChange={handleChange}
            options={options}
        />
    )
}




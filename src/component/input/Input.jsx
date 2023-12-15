import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './input.scss';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Input = React.forwardRef((props,ref) => {
    return  (
        <input 
            id={props.id}
            ref={ref}
            autoComplete={props.autoComplete}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            onChange={props.onChange ? (e) => props.onChange(e) : null}
            aria-describedby={props.describedby}
            aria-invalid={props.invalid}
            onFocus={props.onFocus ? () => props.onFocus() : null}
            onBlur={props.onBlur ? () => props.onBlur() : null}
            required={props.required}
        />
    )
})

export const InputDefault = React.forwardRef((props,ref) => {
    return (
        <input
            ref={ref || null}
            placeholder={props.placeholder}
            type={props.type}
            onChange={props.onChange ? (e) => props.onChange(e) : null}
            value={props.value}
            name={props.name}
            className={props.className ? props.className : ''}
            min={props.min ? props.min : null}
            readOnly={props.readOnly || false}
            disabled={props.disabled || false}
            />
    )
})

export const InputRadio = (props) => {
    return (
        <input 
            type='radio'
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            className={props.className}
        />
    )
}


export const SelectCustom = (props) => {
    const {
        listSelect,
        setListSelect,
        isSelectCount,
        setSelectCount,
        selectCount,
        data
    } = props;
    const contentRef = useRef(null);
    let itemRef = useRef([]);

    const handleShow = () => {
        contentRef.current.parentNode.classList.toggle('open')
    }

    const onChangeCount = (index, value, name) => {
        const findValue = listSelect.findIndex(
            (select) => select.name === name
        );
        if(findValue !== -1){
            setSelectCount({...selectCount, [index]: value});
        }else{
            delete selectCount[index];

        }
    }
    const handleClick = (e, name, id) => {
        const item = itemRef.current[e];
        let index = '';
        if(isSelectCount){
            index = listSelect.findIndex(
                (select) => select.name === name
            );
        }else{
            index = listSelect.findIndex(
                (select) => select === name
            );
        }

        if(index !== -1){
            listSelect.splice(index, 1);
            setListSelect([...listSelect]);
            setSelectCount({...selectCount, [id]: 0});

        }else{
            if(isSelectCount){
                setListSelect([...listSelect,{
                    name: name,
                }])
            }else{
                setListSelect([...listSelect, name]);
            }
        }
        item.parentNode.classList.toggle('checked');
        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");
            if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} Selected`;
            }else{
                btnText.innerText = "Select Language";
            }
    }
    return (
        <div className="SelesctCustom">
            <div className="Select-wrapper">
                <div className="select-btn" onClick={handleShow}>
                    <span className="btn-text">Select Language</span>
                    <span className="arrow-dwn" ref={contentRef}>
                        <FontAwesomeIcon icon={faChevronDown} />
                        <i className="fa-solid fa-chevron-down"></i>
                    </span>
                </div>
                <ul className='list-items'>
                    {data?.map((data, i) => {
                        const index = listSelect.findIndex(
                            (select) => select.name === data.name
                        )
                        return (
                        <li className={`item ${index !== -1 ? 'checked' : ''}`} key={i}>
                            <div className="title" onClick={() => handleClick(i, data.name, data.id)} ref={(el) => (itemRef.current[i] = el)}>
                                <span className="checkbox" >
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className="item-text">{data.name}</span>

                            </div>

                            {isSelectCount ? 
                                <div className="selectCount">
                                    <input 
                                        type='number'  
                                        min={0} 
                                        name='foodCount'
                                        onChange={(e) => onChangeCount(data.id, e.target.value, data.name)}   
                                        value={selectCount[data.id]}
                                        defaultValue={0}
                                    />
                                </div>
                            : null}
                            
                        </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}






export default Input;
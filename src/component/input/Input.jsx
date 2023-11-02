import React from 'react';


import './input.scss';

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


export default Input;
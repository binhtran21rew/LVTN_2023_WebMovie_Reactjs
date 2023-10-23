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

export const InputDefault = (props) => {
    return (
        <input
            placeholder={props.placeholder}
            type={props.type}
            onChange={props.onChange ? (e) => props.onChange(e) : null}
            value={props.value}
            />
    )
}
export default Input;
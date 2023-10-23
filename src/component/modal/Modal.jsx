import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './modal.scss';
import { faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = props => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    )
}

Modal.proTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export const ModalContent = props => {
    const contentRef = useRef(null);
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if(props.onClose) props.onClose();
    }

    return(
        <div ref = {contentRef} className="modal__content" onClick={closeModal}>
            {props.children}
            <div className="modal__content__close">
                <FontAwesomeIcon icon={faCircleXmark} />
            </div>
        </div>
    )
}

export default Modal;


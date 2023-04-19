import React, { useEffect } from 'react'
import styled from 'styled-components';

const Modal = ({type, modalContent, closeModalAlert}) => {
    useEffect(() => {
        let timer = setTimeout(closeModalAlert, 3000);

        return () => clearTimeout(timer);
    })

    return (
        <Wrapper>
            <div className={`show-modal-${type}`}>
                {type === 'danger' ? '❌' : '✅'} {modalContent}
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    .show-modal-danger,
    .show-modal-success {
        padding: .5rem;
        font-size: 13px;
        height: 2rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 5px;
        color: white;
    }
    .show-modal-danger {
        background-color: rgb(234,67,53);
    }
    .show-modal-success {
        background-color: #0B8043;
    }
`;

export default Modal

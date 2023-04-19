import React from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import styled from 'styled-components';


const imgUrl = 'https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_14_2x.png';

const Modal = ({switchSidebar}) => {
    return (
        <Wrapper>
        <div className='show-and-logo'>
            <div className='show-btn' onClick={switchSidebar}>
                <FiAlignJustify />
            </div>
            <div className='logo-title'>
                <img src={imgUrl} alt="Calendar"></img>
                <span>日历</span>
            </div>
        </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .show-and-logo {
        display: flex;
        height: 100%;
        width: 14rem;
        flex-shrink: 0;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .show-btn {
        position: relative;
        width: 1.5rem;
        height: 100%;
        margin-right: 1rem;
        cursor: pointer;
    }
    .show-btn:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 45px;
        height: 45px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .1);
    }
    .show-btn svg {
        color: rgb(100, 100, 100);
        width: 100%;
        height: 100%;
    }
    .logo-title {
        display: flex;
        align-items: center
    }
    .logo-title img {
        height: 45px;
        width: 45px;
    }
    .logo-title span {
        margin-left: .3rem;
        font-size: 1.5rem;
        color: rgb(60,64,67);
    }
`;

export default Modal

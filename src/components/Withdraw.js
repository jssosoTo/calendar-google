import React, { useEffect } from 'react'
import styled from 'styled-components';

const Withdraw = ({show, isWithdraw, withdrawContent, closeWithdrawCard, withdrawList}) => {
    useEffect(() => {
        let timer = setTimeout(() => {
            closeWithdrawCard();
        }, 4000);
        return () => clearTimeout(timer);
    })

    return (
        <Wrapper style={{transform: `${show ? 'translate(-50%, 0px)' : 'translate(-50%, 100%)'}`}}>
            <div className='withdraw-container'>
                <span className='withdraw-title'>{withdrawContent}</span>
                {/* {!isWithdraw && <span className='withdraw-btn' onClick={withdrawList}>撤销</span>} */}
                <span className='withdraw-btn' style={{width: `${isWithdraw ? '0px' : '3rem'}`}} onClick={withdrawList}>撤销</span>
                <span className='close-withdraw' onClick={closeWithdrawCard}>X</span>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    transition: all .2s;
    z-index: 999999;
    .withdraw-container {
        display: flex;
        align-items: center;
        padding-left: .7rem;
        padding-right: .7rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
        background-color: rgb(32,33,36);
        color: white;
        transition: all .3s;
    }
    .withdraw-title {
        margin-right: 4rem;
        font-size: 14px;
    }
    .withdraw-btn {
        overflow: hidden;
        cursor: pointer;
        font-size: 15px;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        width: 3rem;
        color: lightblue;
        border-radius: 5px;
        transition: all .1s;
    }
    .withdraw-btn:hover {
        background-color: rgba(66,133,244, .2);
    }
    .close-withdraw {
        cursor: pointer;
        height: 2rem;
        width: 2rem;
        text-align: center;
        line-height: 2rem;
        border-radius: 50%;
    }
    .close-withdraw:hover {
        background-color: rgba(150, 150, 150, .2);
    }
`;

export default Withdraw

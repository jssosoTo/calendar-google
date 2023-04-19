import React, { useState } from 'react'
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';
import SingleList from './SingleList';

const Remind = ({wholeDayList, closeRemindCard}) => {

    return (
        <Wrapper>
            <div className='remind-container'>
                <div className='btn-container'>
                    <button type="button" onClick={closeRemindCard}>X</button>
                </div>
                <h2 className='show-remind'>{wholeDayList.length} 条提醒</h2>
                <div className='remind-list-container'>
                    <div className='remind-single-list'>
                        <div className='icon-container'>
                            <BiTimeFive />
                        </div>
                        <h4 className='time-title-container'>
                            <span>4月7日（星期五）</span>
                        </h4>
                    </div>
                </div>
                {
                    wholeDayList.map(item => {
                        return <SingleList key={item.id} closeRemindCard={closeRemindCard} {...item} />
                    })
                }
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    z-index: 999;
    .remind-container {
        width: 25rem;
        box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, .3);
        border-radius: 10px;
        padding-left: .5rem;
        background-color: #fff;
        padding-bottom: 1rem;
    }
    .btn-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 3rem;
    }
    .btn-container button {
        cursor: pointer;
        font-size: 15px;
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        margin-right: .5rem;
        border: transparent;
        background-color: transparent;
    }
    .btn-container button:hover {
        background-color: rgba(200, 200, 200, .2);
    }
    .show-remind {
        padding-left: 3rem;
        font-weight: normal;
        margin-bottom: 1rem;
    }
    .remind-single-list {
        display: flex;
        align-items: center;
        height: 2.5rem;
    }
    .icon-container {
        width: 3rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon-container svg {
        width: 1.5rem;
        height: 1.5rem;
    }
    .time-title-container {
        width: 100%;
        height: 100%;
        line-height: 2.5rem;
        letter-spacing: .1em;
        font-size: 14px;
        color: rgb(100,100,100);
        padding-left: .5rem;
    }
    .functions-btn-container {
        float: right;
        margin-right: 1rem;
        height: 100%;
        line-height: 2rem;
    }
    .functions-btn-container button {
        position: relative;
        cursor: pointer;
        margin-left: .5rem;
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        border: transparent;
        background-color: transparent;
    }
    .functions-btn-container button:hover {
        background-color: rgba(200, 200, 200, .2);
    }
    .functions-btn-container button svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .complete-state {
        text-decoration: line-through;
    }
`;

export default Remind

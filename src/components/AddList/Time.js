import React, { useEffect, useRef, useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import styled from 'styled-components';

const Time = ({year, month, day, time, changeValue}) => {
    const dateContainer = useRef(null);
    const timeContainer = useRef(null);

    return (
        <Wrapper>
            <div className='time-total-container'>
                <div className='time-icon'><BiTimeFive /></div>
                <div className='set-time-container'>
                    <div className='date-clock-container'>
                        <input 
                            ref={dateContainer}
                            type="date"
                            name="date"
                            value={`${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`}
                            onChange={changeValue}
                        />
                        <input 
                            ref={timeContainer}
                            type="time" 
                            name="time"
                            value={time}
                            onChange={changeValue}
                        />
                    </div>
                    <h5>不重复</h5>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .time-total-container {
        display: flex;
        align-items: center;
        height: 4rem;
    }
    .time-total-container .time-icon {
        position: relative;
        width: 2rem;
        margin-right: .7rem;
    }
    .time-total-container .time-icon svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1.5rem;
        height: 1.5rem;
    }
    .set-time-container {
        cursor: pointer;
        flex: 1;
        height: 3.5rem;
        padding: .5rem .5rem;
    }
    .set-time-container:hover {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .1);
    }
    .set-time-container .date-clock-container input {
        cursor: pointer;
        border: transparent;
        background-color: transparent;
        height: 1.3rem;
        font-size: 15px;
        transition: all .2s;
    }
    .set-time-container .date-clock-container input:hover {
        border-bottom: 1px solid gray;
    }
    .set-time-container .date-clock-container input:first-child {
        margin-right: 1rem;
    }
    .set-time-container h5 {
        font-size: 12px;
        font-weight: normal;
    } 
`;

export default Time;
import React from 'react'
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';

const Time = ({year, month, day, time, changeValue, setWholeDay, isWholeDay}) => {

    return (
        <Wrapper>
            <div className='line-show'>
                <div className='event-icon'><BiTimeFive /></div>
                <div className='title-container'>
                    <input 
                        type="date"
                        name="date"
                        value={`${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`}
                        onChange={changeValue}
                    ></input>
                    {
                        !isWholeDay && (
                            <input 
                                type="time"
                                name="time"
                                value={time}
                                onChange={changeValue}
                            ></input>
                        )
                    }
                    
                </div>
                <div className='select-whole-day-container'>
                    <input type="checkbox" id="wholeday" name="wholeday" onClick={setWholeDay} />
                    <label htmlFor='wholeday'>全天</label>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    margin-top: 1rem;
    .title-container {
        height: 100%;
        background-color: rgba(200, 200, 200, .3);
        border-radius: 5px;
        padding-left: .5rem;
    }
    .title-container input {
        outline: none;
        border: transparent;
        background: transparent;
        height: 100%;
        font-size: 14px;
        margin-right: 1rem;
    }
    .select-whole-day-container {
        display: flex;
        align-items: center;
        width: 5rem;
        padding-left: 1rem;
    }
    .select-whole-day-container input {
        position: relative;
        cursor: pointer;
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .5rem;
    }
    .select-whole-day-container input:hover::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: '';
        display: block;
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 50%;
        background-color: rgba(200, 200, 200, .3);
    }
`;

export default Time

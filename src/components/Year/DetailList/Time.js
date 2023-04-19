import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import styled from 'styled-components';

const Time = ({month, day, time}) => {
    return (
        <Wrapper>
            <div className='line-show'>
                <div className='event-icon'><BiTimeFive /></div>
                <div className='set-time-container'>
                    <h3 className='date-week-container'>{month}月{day}日</h3>
                    <h5 className='time-container'>{time}</h5>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .line-show {
        height: 3.5rem;
    }
    .set-time-container {
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
    }
    .set-time-container .date-week-container {
        font-weight: normal;
        font-size: 15px;
    }
    .set-time-container .time-container {
        font-weight: normal;
        font-size: 12px;
        color: gray;
    }
`;

export default Time
